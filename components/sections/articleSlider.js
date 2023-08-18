import Image from 'next/image'
import { Navigation } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import ArticleCard from '../articleCard'

const containerClassName = 'container mx-auto px-4'

export default function ArticleSlider(props) {
  const { title, articles } = props

  return (
    <section className="overflow-hidden">
      <div className={containerClassName}>
        <div className="flex justify-between items-center mb-3 lg:mb-5">
          <h2 className="text-heading-sm lg:text-heading-md">{title}</h2>

          <div className="flex items-center gap-6">
            <button type="button" className="flex" data-js-prev-articles>
              <Image src="/images/prev.svg" alt="Next" width={11} height={19} />
            </button>
            <button type="button" className="flex" data-js-next-articles>
              <Image src="/images/next.svg" alt="Next" width={11} height={19} />
            </button>
          </div>
        </div>
      </div>

      <div className="slider-mask">
        <style jsx>
          {`
            @media (min-width: 1024px) {
              .slider-mask {
                mask-image: linear-gradient(
                  to right,
                  #000000,
                  #000000 70%,
                  transparent
                );
              }
            }
          `}
        </style>

        <div className={containerClassName}>
          <Swiper
            spaceBetween={18}
            slidesPerView={1.05}
            className="!overflow-visible"
            navigation={{
              prevEl: '[data-js-prev-articles]',
              nextEl: '[data-js-next-articles]',
            }}
            modules={[Navigation]}
            breakpoints={{
              1024: {
                slidesPerView: 1.7,
                spaceBetween: 30,
              },
            }}
          >
            {articles.map((article) => {
              return (
                <SwiperSlide key={article._id}>
                  <ArticleCard article={article} size="large" />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
