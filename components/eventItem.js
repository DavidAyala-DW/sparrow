import Link from 'next/link'
import SimpleBlockContent from '@/components/simple-block-content'
import SanityImage from './sanity-image'

export default function EventItem({ position, event }) {
  const {
    image,
    alt_text,
    title,
    description,
    date,
    book_button_text,
    book_button_link,
  } = event

  return (
    <section
      className={`px-4 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col lg:flex-row space-y-10 lg:space-y-0  justify-between lg:items-center`}
    >
      <div
        className={`w-full order-1
        ${position == 'firstImage' ? 'lg:w-[48.45%]' : 'lg:w-[51.55%]'}
        ${position == 'firstImage' ? 'lg:order-1' : 'lg:order-2'}
        `}
      >
        <div
          className={`aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.2972] 3xl:aspect-w-[1.7814] aspect-h-1`}
        >
          <div className="w-full h-full">
            <div className="w-full h-full relative">
              <SanityImage
                src={image}
                layout="fill"
                alt={alt_text}
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full order-2 flex flex-col 
        ${position != 'firstImage' ? 'lg:w-[48.45%]' : 'lg:w-[51.55%]'}
        ${
          position == 'firstImage'
            ? 'lg:order-2 lg:pl-[5.8333vw]'
            : 'lg:order-1 lg:pr-[5.8333vw]'
        }
        `}
      >
        <h2 className="text-[32px] vw:text-[1.25vw] leading-11 vw:leading-[1.375] font-light mb-2 vw:mb-[.41666vw]">
          {title}
        </h2>

        <p className="font-normal text-base vw:text-[.8333vw] leading-[1.5] opacity-[.85] mb-5 vw:mb-[1.041666vw]">
          {date}
        </p>

        <div className="opacity-[.85] text-base vw:text-[.8333vw] w-full md:max-w-[500px] lg:max-w-[531px] vw:max-w-[27.656vw] leading-[1.5] font-normal">
          {description && <SimpleBlockContent blocks={description} />}
        </div>

        {book_button_text && (
          <Link href={book_button_link} passHref>
            <a className="mt-10 vw:mt-[2.0833] max-w-min font-[390] text-[#E7E3DA] text-base leading-[100%] px-3 py-2 border border-[#E7E3DA] transition-colors vw:text-[.9375vw] vw:leading-[1.388] tracking-[.05em] uppercase">
              {book_button_text}
            </a>
          </Link>
        )}
      </div>
    </section>
  )
}
