export const config = {
  dataset: 'production',
  projectId: 'kq13uftm',
  apiVersion: '2022-06-29', // Learn more: https://www.sanity.io/docs/api-versioning
  useCdn: false,
  /**
   * You might need this if you host the preview on a different url than Sanity Studio
   */
  token: process.env.SANITY_API_TOKEN,
  // EventSource: /* provide your own event source implementation. Required in browsers to support the above token parameter. */
}
