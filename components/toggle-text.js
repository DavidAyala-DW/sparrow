import { PortableText } from '@portabletext/react'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

export default function ToggleText(props) {
  const { _key, title, text } = props.value
  const toggleId = `text-toggle-${_key}`
  const panelId = `text-panel-${_key}`
  const [isOpen, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen((value) => !value)
  }

  return (
    <div className="toggle-text">
      <button
        aria-expanded={String(isOpen)}
        aria-controls={panelId}
        className="w-full text-left"
        id={toggleId}
        onClick={toggleOpen}
      >
        <h3 className="not-prose pr-7 lg:pt-[0.6vw] xl:pr-[2.5vw] mb-1.5 lg:mb-[0.6vw] text-lg xl:text-[1.4vw] leading-tight text-bone">
          {title}
        </h3>
        <span className="flex items-center space-x-4 xl:space-x-[1.4vw]">
          <span className="grow h-[2px] bg-[#5D5C5C]/40" />
          <span
            className={clsx(
              'w-[16px] xl:w-[1.2vw] transition',
              isOpen && '-scale-100'
            )}
          >
            <Image
              layout="responsive"
              width="16"
              height="9"
              src="/images/dd-chevron.svg"
              alt=""
              aria-hidden="true"
            />
          </span>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={toggleId}
        className={clsx(
          'overflow-hidden transition-all',
          isOpen ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="prose py-3 lg:py-[1vw] 2xl:text-[1.12vw]">
          <PortableText value={text} />
        </div>
      </div>
    </div>
  )
}
