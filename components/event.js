import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import SimpleBlockContent from '@/components/simple-block-content'
import SanityImage from './sanity-image'

export default function Event({ event }) {
  const {
    title,
    image,
    description,
    date,
    book_button_text,
    book_button_link,
  } = event

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 lg:grid lg:grid-cols-[40.07%_55.48%] lg:gap-x-[53.5px] 3xl:gap-x-[2.78vw] w-full">
      <div className="w-full">
        <div className="w-full aspect-h-1 aspect-w-[1.435] lg:aspect-w-[1.25]">
          <div className="w-full">
            <div className="w-full h-full relative">
              <SanityImage
                className="object-cover"
                src={image}
                alt={title}
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:justify-between h-full w-full">
        <div className="flex flex-col w-full mb-11 vw:mb-[2.291vw]">
          <h3 className="text-[24px] lg:text-[32px] vw:text-[1.6666vw] leading-[33px] lg:leading-11 vw:leading-[1.375] font-light mb-2 vw:mb-[.41666vw]">
            {title}
          </h3>

          <p className="opacity-80 font-normal text-base vw:text-[.83333vw] leading-[1.5] mb-5 vw:mb-[1.0416vw]">
            {date}
          </p>

          <div className="font-normal text-base vw:text-[.8333vw] leading-[1.5] opacity-80 lg:max-w-[46.3vw]">
            {description && <SimpleBlockContent blocks={description} />}
          </div>
        </div>

        {book_button_text && book_button_link && (
          <a
            href={book_button_link}
            className="max-w-max flex items-center space-x-2 vw:space-x-[.41666vw] opacity-80"
          >
            <p className="font-light text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3889] tracking-[.05em] uppercase underline">
              {book_button_text}
            </p>

            <div className="w-[25px] vw:w-[1.302vw] h-[23px] vw:h-[1.197vw]">
              <Image
                src="/images/arrowRightB.svg"
                alt="Arrow right"
                width={25}
                height={23}
                layout="responsive"
              />
            </div>
          </a>
        )}
      </div>
    </div>
  )
}
