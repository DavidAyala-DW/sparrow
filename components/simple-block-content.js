import { PortableText } from '@portabletext/react'
import PropTypes from 'prop-types'
import EmbedHTML from './embed-html'
import Figure from './figure'
import ToggleText from './toggle-text'

function SimpleBlockContent(props) {
  const { blocks } = props
  if (!blocks) {
    console.error('Missing blocks')
    return null
  }

  return (
    <PortableText
      value={blocks}
      components={{
        types: {
          embedHTML: EmbedHTML,
          'sanity.imageAsset': ({ value }) => <Figure {...value} />,
          toggleText: ToggleText,
        },
      }}
    />
  )
}

SimpleBlockContent.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
}

export default SimpleBlockContent
