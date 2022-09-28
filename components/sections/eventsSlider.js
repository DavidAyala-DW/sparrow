import Image from "next/image"
import SanityImage from '../sanity-image'
import Event from "../event"
import SanityLink from "../sanityLink"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from "swiper";

export default function EventsSlider(props) {

  const {title, links, events} = props;

  return (

    <section className="pl-4 md:pl-5 lg:pl-[2.777%] w-full flex flex-col pb-[74px] md:pb-[56px] vw:pb-[2.91666vw] relative">

      <div className="flex flex-col w-full mb-8 vw:mb-[1.6666vw]">

        <h2 className="text-[32px] md:text-[48px] vw:text-[2.5vw] leading-11 md:leading-[66px] vw:leading-[1.375] font-light">
          {title}
        </h2>

        {
          links && (
            <SanityLink
              {...{links}}
              className="mt-2 vw:mt-[.416vw] text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.38888]
              tracking-[.05em] opacity-80 uppercase underline font-light lg:hidden"
            >
              {links?.title}
            </SanityLink>
          )
        }

      </div>

      <Swiper
        spaceBetween={12}
        slidesPerView={1.05}
        className="w-full"
        navigation={{
          prevEl: '.left-arrow',
          nextEl: '.right-arrow ',
        }}
        modules={[Navigation]}
        breakpoints = {{

          320: {
            slidesPerView: 1.05,
            spaceBetween: 12
          },
          744: {
            slidesPerView: 2.05,
            spaceBetween: 24
          },
          1024: {
            slidesPerView: 1.145,
            spaceBetween: 54
          },
          1920: {
            slidesPerView: 1.38,
            spaceBetween: 54
          }

        }}
      >

        {events.map(event => {

          const {_key} = event;

          return (

            <SwiperSlide key={_key} className="flex flex-col w-full lg:!w-[86%] 3xl:!w-[64.7%]">
              <div className="w-full">
                <Event event={event}/>
              </div>              
            </SwiperSlide>

          )

        })}

      </Swiper>

      {
          links && (
            <SanityLink
              {...{links}}
              className="mt-10 vw:mt-[2.0833vw] text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.38888]
              tracking-[.05em] opacity-80 uppercase underline font-light hidden lg:block"
            >
              {links?.title}
            </SanityLink>
          )
        }

      <div className="absolute pl-[3.33%] bottom-0 left-0 flex items-center space-x-4 vw:space-x-[.83333vw]">

        <div className="left-arrow cursor-pointer w-[11px] vw:w-[.5729vw]">
          <Image
            src="/images/prev.svg"
            alt="Next"
            width={11}
            height={19}
            layout="responsive"
          />
        </div>

        <div className="right-arrow cursor-pointer w-[11px] vw:w-[.5729vw]">
          <Image
            src="/images/next.svg"
            alt="Next"
            width={11}
            height={19}
            layout="responsive"
          />
        </div>

      </div>

    </section>

  )

}
