import groq from 'groq'

const ARTICLE_TYPE = process.env.SANITY_ARTICLE_DOC_TYPE

export function newsDetailsQuery(slug) {
  return `*[_type == "newsPT" && slug.current == "${slug}" ][0]{
    title,description,link,image
  }`
}

export function locationQuery(slug) {
  return `*[_type == "locationsSparrow" && slug.current == "${slug}" ][0]{
    title,
    menus
  }`
}

export const imageQueryPart = groq`
  ...(asset -> {
    _id,
    _type,
    url,
    extension,
    altText,
    "blurDataUrl": metadata.lqip,
  }),
`

const portableTextQueryPart = `
  _type == 'image' => {
    ${imageQueryPart}
  },
`

export const articleCardQueryPart = groq`
  _id,
  title,
  publishDate,
  'excerpt': coalesce(excerpt, pt::text(content[_type == 'block'][0...2])),
  'url': '/articles/' + slug.current,
  image {
    ${imageQueryPart}
  },
  author->,
  'readTimeMinutes': round(length(pt::text(content)) / 5 / 180),
`

export const pageQueryPart = groq`
  ...,
  content[] {
    ...,
    _type == 'sparrowEventList' || _type == 'eventsSlider' => {
      'events': *[_type == 'eventSparrow' && active && (^.^._type != 'locationsSparrow' || references(^.^._id))] | order(_createdAt desc)
    },
    _type == 'sparrowGiftCardList' => {
      locations[] {
        ...,
        location -> { title, image }
      }
    },
    _type == 'articleGrid' => {
      ...,
      'articles': *[_type == '${ARTICLE_TYPE}' && (^.hasFeatured || !isFeatured)]
        | order(publishDate desc)[0...9] {
        ${articleCardQueryPart}
      },
    },
    _type == 'articleSlider' => {
      ...,
      'articles': *[_type == '${ARTICLE_TYPE}' && isFeatured]
        | order(publishDate desc)[0...5] {
        ${articleCardQueryPart}
      },
    },
  }
`

export const articleQueryPart = groq`
  ...,
  'slug': slug.current,
  content[] {
    ...,
    ${portableTextQueryPart}
  },
  'excerpt': coalesce(excerpt, pt::text(content[_type == 'block'][0...2])),
  image {
    ${imageQueryPart}
  },
  author->,
  // Words per minute: 180
  'readTimeMinutes': round(length(pt::text(content)) / 5 / 180),
  'featuredArticles': *[_type == '${ARTICLE_TYPE}' && isFeatured && _id != ^._id]
    | order(publishDate desc)[0...2] {
    ${articleCardQueryPart}
  },
`
