import groq from 'groq'
import { NextSeo } from 'next-seo'
import client from '@/lib/sanity-client'
import Layout from '@/components/layout'
import RenderSections from '@/components/render-sections'
import { getSlugVariations, slugParamToPath } from '@/lib/urls'

export default function Page({props}) {
  
  const {
    title = 'Missing title',
    content = [],
    stickyHeader,
    siteSettings,  
    menus,
    locations
  } = props

  return (    
    <Layout menus={menus} locations={locations} siteSettings={siteSettings} stickyHeader={stickyHeader}>
      <NextSeo
        title={title}
      />
      {content && <RenderSections sections={content} />}
    </Layout>
  )
}

async function fulfillSectionQueries(page, slug) {

  if (!page.content) {
    return page
  }

  const sectionsWithQueryData = await Promise.all(

    page.content.map(async (section) => {

    
      if(section._type === 'imageWithText' && section?.menus){
        section.menus = page.menus;
        section.slug = slug;
      }

      if(section.locations){

        if(Array.isArray(section.locations)){
          await Promise.all(section.locations.map(async (location) => {
            const queryData = await client.fetch(groq`*[_type == "locationsSparrow" && _id == "${location._ref}" ][0]{...}`)
            const {title, image} = queryData;
            location.title = title;
            location.image = image;
            location.query = queryData;
          }

          ))

        }else{
          const queryData = await client.fetch(groq`*[_type == "locationsSparrow" && _id == "${section.locations._ref}" ][0]{...}`)
          const {title, image} = queryData;
          location.title = title;
          location.image = image;
          section.locations.query = queryData;
        }

      }

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

  const routes = await client.fetch(groq`*[_type == 'locationsSparrow']{slug}`);
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

async function getMenus(){
  const request = await client.fetch(groq`*[_type == "routesSparrow"] {_id, slug {current}} `);
  return request;
}

async function getSiteConfig(){
  const siteSettings = await client.fetch(groq`*[_type == "siteSettings" && site == "sparrow"][0]{...}`);
  return siteSettings;
}

async function getLocations(){
  const request = await client.fetch(groq`*[_type == "locationsSparrow"] {_id, title, comming_soon, menus, slug {current}} `);
  return request;
}

async function getPageSections(slug){

  const request = await client.fetch(
    groq`
      *[_type == "locationsSparrow" && slug.current in $possibleSlugs][0]{
        _id,
        title,
        menus,
        content
      }
    `,
    { possibleSlugs: getSlugVariations(slug) }
  )
  
  return request
}

export const getStaticProps = async ({ params }) => {

  const slug = slugParamToPath(params?.slug)
  let [data, siteSettings, menus, locations] = await Promise.all([getPageSections(slug), getSiteConfig(), getMenus(), getLocations()])
  data = await fulfillSectionQueries(data, slug)

  return {
    props:{
      props: { ...data, siteSettings, menus, locations } || {},
    }
  }
  
}
