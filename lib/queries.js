import groq from 'groq';

export function newsDetailsQuery(slug) {
  return `*[_type == "newsPT" && slug.current == "${slug}" ][0]{
    title,description,link,image
  }`;
}

export function locationQuery(slug) {
  return `*[_type == "locationsSparrow" && slug.current == "${slug}" ][0]{
    title,
    menus
  }`;
}

export const pageQuery = groq`
  ...,
  content[] {
    ...,
    _type == 'sparrowGiftCardList' => {
      locations[] {
        ...,
        location -> { title, image }
      }
    }
  }
`;
