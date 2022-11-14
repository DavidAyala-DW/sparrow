import groq from 'groq'
import { NextSeo } from 'next-seo'
import client from '@/lib/sanity-client'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout'
import RenderSections from '@/components/render-sections'
import { getSlugVariations, slugParamToPath } from '@/lib/urls'
import { getClient } from '@/lib/sanity.server'
import { usePreviewSubscription } from '@/lib/sanity'
import { pageContentQuery } from '@/lib/queries'

const ExitPreviewButton = dynamic(() =>
  import('@/components/exit-preview-button')
)

export default function Page(props) {

  const { preview, data, siteSettings, menus, locations } = props;
  const stickyHeader = false;
  const {page: {page : {title}}} = data;
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  const page = filterDataToSingleItem(previewData?.page, preview)

  return (    
    <Layout menus={menus} locations={locations} siteSettings={siteSettings} stickyHeader={stickyHeader}>
      <NextSeo
        title={title}
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

async function fulfillSectionQueries(page,internalLinks) {

  if (!page?.page?.content) {
    return page
  }

  const sectionsWithQueryData = await Promise.all(

    page.page.content.map(async (section) => {

      if(section?.links){
        const {_type} = section?.links ?? null;
        if(_type == "links"){
          const {link} = section?.links ?? null;
          const selectedLink = internalLinks.find(internalLink => internalLink._id == link._ref);
          if(selectedLink){
            section.links.internalLink = selectedLink.slug.current;
          }          
        }        
      }

      if(section?.locations){
        if(Array.isArray(section.locations)){

          await Promise.all(section.locations.map(async (location) => {
            const queryData = await client.fetch(groq`*[_type == "locationsSparrow" && _id == "${location._ref}" ][0]{...}`)
            const {title, image, slug, menus = null} = queryData;
            location.title = title;
            location.image = image;
            location.menus = menus;
            location.slug = slug;
            location.query = queryData;
          }

          ))

        }else{
          const queryData = await client.fetch(groq`*[_type == "locationsSparrow" && _id == "${section.locations._ref}" ][0]{...}`)
          section.locations.query = queryData;
        }
      }

      if(section._type === 'imageWithText' && section?.show_locations){
        section.locations = page?.locations;
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

  const routes = await client.fetch(groq`*[_type == 'routesSparrow']{slug}`);
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
      *[_type == "routesSparrow" && slug.current in $possibleSlugs][0]{
        page -> {...}
      }
    `,
    { possibleSlugs: getSlugVariations(slug) }
  )

  return request?.page;
}

export const getStaticProps = async ({ params, preview = false }) => {

  const slug = slugParamToPath(params?.slug)
  const client = getClient(preview)
  const query =  groq`
    *[_type == "routesSparrow" && slug.current in $possibleSlugs][0]{
      page -> {...}
    }
  ` 
  const queryParams = { possibleSlugs: getSlugVariations(slug) }
  let data = await client.fetch(query, queryParams)
  let [siteSettings, menus, locations] = await Promise.all([getSiteConfig(), getMenus(), getLocations()])  
  let page = filterDataToSingleItem(data, preview)
  page.slug = slug;
  page.locations = locations;
  page = await fulfillSectionQueries(data,menus)
  page.query = query;
  page.queryParams = queryParams;
  

  return {
    props:{
      data: {page, query, queryParams},
      siteSettings,
      menus,
      locations,
      menus,
      preview
    }
  }
  
}
