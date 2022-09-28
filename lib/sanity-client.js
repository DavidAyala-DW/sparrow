import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'kq13uftm',
  dataset: 'production',
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2022-06-29',
})

export default client
