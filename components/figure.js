import SanityImage from './sanity-image'

export default function Figure(props) {
  const { caption, asset } = props

  if (!asset) {
    return null
  }

  return (
    <figure>
      <SanityImage src={asset} />
      {caption && (
        <figcaption>
          <p>{caption}</p>
        </figcaption>
      )}
    </figure>
  )
}
