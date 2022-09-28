import React from 'react'
import PropTypes from 'prop-types'
import SanityImage from './sanity-image'

function Figure({ node }) {
  const { alt, caption, asset } = node
  if (!asset) {
    return undefined
  }

  return (
    <figure>
      <SanityImage src={asset} alt={alt} />
      {caption && (
        <figcaption>
          <div>
            <div>
              <p>{caption}</p>
            </div>
          </div>
        </figcaption>
      )}
    </figure>
  )
}

Figure.propTypes = {
  node: PropTypes.shape({
    alt: PropTypes.string,
    caption: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
}
export default Figure
