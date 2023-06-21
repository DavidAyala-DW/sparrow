import groq from 'groq'

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
    }
  }
`
