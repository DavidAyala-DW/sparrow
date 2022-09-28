import React from 'react'
import PropTypes from 'prop-types'
import upperFirst from 'lodash-es/upperFirst'

import * as SectionComponents from './sections'

function resolveSections(section) {
  // eslint-disable-next-line import/namespace
  const Section = SectionComponents[upperFirst(section._type)]

  if (Section) {
    return Section
  }

  console.error(`Can't find a section type matching "${section._type}"`) // eslint-disable-line no-console
  return null
}

function RenderSections(props) {
  const { sections } = props
  if (!sections) {
    console.error('Missing section')
    return <div>Missing sections</div>
  }

  return (
    <>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section)
        if (!SectionComponent) {
          return null
        }
        return (
          
          <div key={section._key}>
            <div>
              <SectionComponent {...section} />

              {/* data-scroll-class only allows one class, so we can't use Tailwind classes for this :( */}
              <style jsx>
                {`
                  .page-section-revealed {
                    opacity: 1;
                    transform: none;
                  }
                `}
              </style>
            </div>
          </div>
        )
      })}
    </>
  )
}

RenderSections.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      section: PropTypes.instanceOf(PropTypes.object),
    })
  ),
}

export default RenderSections
