import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout'
import RenderSections from '@/components/render-sections'
import { locationQuery } from '@/lib/queries'
import { usePreviewSubscription } from '@/lib/sanity'
import client from '@/lib/sanity-client'
import { getClient } from '@/lib/sanity.server'
import { getSlugVariations, slugParamToPath } from '@/lib/urls'

const ExitPreviewButton = dynamic(() =>
  import('@/components/exit-preview-button')
)

export default function Page(props) {
  const { preview, data, siteSettings, menus, locations } = props
  const {
    page: { title, seo_title, description, openGraphImage },
  } = data
  const builder = imageUrlBuilder(getClient(preview))

  const stickyHeader = false
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  const page = filterDataToSingleItem(previewData, preview)
  page.content = Array.isArray(page.content) ? [...page.content] : []

  return (
    <Layout
      menus={menus}
      locations={locations}
      siteSettings={siteSettings}
      stickyHeader={stickyHeader}
    >
      <NextSeo
        title={title}
        description={description ?? ''}
        {...(openGraphImage
          ? {
              openGraph: {
                images: [
                  {
                    url: builder
                      .image(openGraphImage)
                      .width(1200)
                      .height(630)
                      .url(),
                    width: 1200,
                    height: 630,
                    alt: title,
                  },
                ],
              },
            }
          : {})}
      />
      {page?.content && <RenderSections sections={page?.content} />}
      {preview && <ExitPreviewButton />}
    </Layout>
  )
}

function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) {
    return data
  }

  if (data.length === 1) {
    return data[0]
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
  }

  return data[0]
}

async function fulfillSectionQueries(page, slug, internalLinks) {
  if (!page.content) {
    return page
  }

  const sectionsWithQueryData = await Promise.all(
    page.content.map(async (section) => {
      if (section._type === 'eventsSlider') {
        if (Array.isArray(section.events)) {
          await Promise.all(
            section.events.map(async (event) => {
              if (!event?._ref) return
              const queryData = await client.fetch(
                groq`*[_type == "eventSparrow" && _id == "${event._ref}" ][0]{...}`
              )
              event.query = queryData
            })
          )
        }
      }

      if (section._type === 'privateEventsList') {
        if (Array.isArray(section.eventsList)) {
          await Promise.all(
            section.eventsList.map(async (event) => {
              if (!event?._ref) return
              const queryData = await client.fetch(
                groq`*[_type == "eventsSparrow" && _id == "${event._ref}" ][0]{...}`
              )
              event.query = queryData
            })
          )
        }
      }

      if (section?.links) {
        const { _type } = section?.links ?? {}
        if (_type == 'links') {
          const { link } = section?.links ?? {}
          const selectedLink = internalLinks.find(
            (internalLink) => internalLink._id == link?._ref
          )
          if (selectedLink) {
            section.links.internalLink = selectedLink.slug.current
          }
        }
      }

      if (section?.locations) {
        if (Array.isArray(section.locations)) {
          await Promise.all(
            section.locations.map(async (location) => {
              if (!location?._ref) return
              const queryData = await client.fetch(
                groq`*[_type == "locationsSparrow" && _id == "${location._ref}" ][0]{...}`
              )
              const { title, image, slug, menus = null } = queryData
              location.title = title
              location.image = image
              location.menus = menus
              location.slug = slug
              location.query = queryData
            })
          )
        } else {
          if (!section?.locations?._ref) return
          const queryData = await client.fetch(
            groq`*[_type == "locationsSparrow" && _id == "${section?.locations?._ref}" ][0]{...}`
          )
          section.locations.query = queryData
        }
      }

      if (section._type === 'imageWithText' && section?.show_locations) {
        section.locations = page?.locations
      }

      //Detectar _type-> el nombre de un documento y para cada documento se tendra un objeto desde el server con query groq, revisar que solo se ejecute una vez
      if (section.query) {
        const queryData = await client.fetch(groq`${section.query}`)

        return { ...section, query: queryData }
      } else {
        return section
      }
    })
  )

  return { ...page, content: sectionsWithQueryData }
}

export async function getStaticPaths() {
  const routes = await client.fetch(groq`*[_type == 'locationsSparrow']{slug}`)
  const paths = routes.map(({ slug }) => ({
    params: {
      slug: slug.current === '/' ? false : [slug.current],
    },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

async function getMenus() {
  const request = await client.fetch(
    groq`*[_type == "routesSparrow"] {_id, slug {current}} `
  )
  return request
}

async function getSiteConfig() {
  const siteSettings = await client.fetch(
    groq`*[_type == "siteSettings" && site == "sparrow"][0]{...}`
  )
  return siteSettings
}

async function getLocations() {
  const request = await client.fetch(
    groq`*[_type == "locationsSparrow"] | order(_createdAt  asc) {_id, title, comming_soon, menus, slug {current}} `
  )
  return request
}

async function getPageSections(slug) {
  const request = await client.fetch(
    groq`
      *[_type == "locationsSparrow" && slug.current in $possibleSlugs][0]{
        _id,
        title,
        content
      }
    `,
    { possibleSlugs: getSlugVariations(slug) }
  )

  try {
    request.content = [...request.content]
  } catch (error) {
    request.content = []
  }

  return request
}

export const getStaticProps = async ({ params, preview = false }) => {
  const slug = slugParamToPath(params?.slug)
  const client = getClient(preview)
  const query = groq`
    *[_type == "eventsSparrow" && slug.current in $possibleSlugs][0]{
      ...
    }
  `
  const queryParams = { possibleSlugs: getSlugVariations(slug) }
  let data = await client.fetch(query, queryParams)
  let [siteSettings, menus, locations] = await Promise.all([
    getSiteConfig(),
    getMenus(),
    getLocations(),
  ])
  let page = filterDataToSingleItem(data, preview)
  page.content = [...page.content]
  page.slug = slug
  page.locations = locations
  page = await fulfillSectionQueries(data, slug, menus)
  page.query = query
  page.queryParams = queryParams

  return {
    props: {
      data: { page, query, queryParams },
      siteSettings,
      locations,
      menus,
      preview,
    },
  }
}
