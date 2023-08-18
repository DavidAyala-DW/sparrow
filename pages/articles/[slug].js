import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout'
import { ArticleLayout } from '@/components/layouts/articleLayout'
import { articleQueryPart } from '@/lib/queries'
import { usePreviewSubscription } from '@/lib/sanity'
import { getClient } from '@/lib/sanity.server'
import { pathToSlugParam } from '@/lib/urls'

const ExitPreviewButton = dynamic(() =>
  import('@/components/exit-preview-button')
)

export default function ArticlePage(props) {
  const { isPreview, data, query } = props
  const builder = imageUrlBuilder(getClient(isPreview))

  /**
   * This hook handles live-updating data in preview mode.
   * Does nothing if isPreview == false.
   */
  const { data: previewData } = usePreviewSubscription(query, {
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data.article,
    enabled: isPreview,
  })

  // Client-side uses the same query, so we may need to filter it down again
  const article = filterDataToSingleItem(previewData, isPreview)

  return (
    <Layout
      menus={data.menus}
      locations={data.locations}
      siteSettings={data.siteSettings}
    >
      <NextSeo
        title={`${article.title} | Sparrow`}
        description={article.excerpt}
        {...(article.image
          ? {
              openGraph: {
                images: [
                  {
                    url: builder
                      .image(article.image)
                      .width(1200)
                      .height(630)
                      .url(),
                    width: 1200,
                    height: 630,
                    alt: article.image.altText,
                  },
                ],
              },
            }
          : {})}
      />
      <ArticleLayout article={article} />
      {isPreview && <ExitPreviewButton />}
    </Layout>
  )
}

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
function filterDataToSingleItem(data, isPreview) {
  if (!Array.isArray(data)) {
    return data
  }

  if (data.length === 1) {
    return data[0]
  }

  if (isPreview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
  }

  return data[0]
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const client = getClient(isPreview)

  const query = groq`
    *[_type == '${process.env.SANITY_ARTICLE_DOC_TYPE}' && slug.current == '${params.slug}'] {
      ${articleQueryPart}
    }
  `

  const data = await client.fetch(query)

  // Escape hatch, if our query failed to return data
  if (!data?.length) {
    return { notFound: true }
  }

  // Helper function to reduce all returned documents down to just one
  const article = filterDataToSingleItem(data, isPreview)

  const [siteSettings, menus, locations] = await Promise.all([
    getSiteConfig(),
    getMenus(),
    getLocations(),
  ])

  return {
    props: {
      isPreview,
      data: { article, siteSettings, menus, locations, query },
    },
  }
}

export async function getStaticPaths() {
  const articlePaths = await getClient().fetch(
    groq`*[_type == '${process.env.SANITY_ARTICLE_DOC_TYPE}'].slug.current`
  )

  const paths = articlePaths
    .filter(Boolean)
    .map((path) => ({ params: { slug: pathToSlugParam(path) } }))

  return {
    paths,
    fallback: false,
  }
}

async function getMenus() {
  const request = await getClient().fetch(
    groq`*[_type == "routesSparrow"] {_id, slug {current}} `
  )
  return request
}

async function getSiteConfig() {
  const siteSettings = await getClient().fetch(
    groq`*[_type == "siteSettings" && site == "sparrow"][0]{...}`
  )
  return siteSettings
}

async function getLocations() {
  const request = await getClient().fetch(
    groq`*[_type == "locationsSparrow"] {_id, title, comming_soon, menus, slug {current}} `
  )
  return request
}
