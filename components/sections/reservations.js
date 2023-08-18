import Link from 'next/link'
import SanityImage from '../sanity-image'
import SimpleBlockContent from '../simple-block-content'

export default function Reservations(props) {
  const { title, reservations } = props
  return (
    <>
      <section className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-20 md2:pt-[162px] pb-6 md2:pb-[100px]">
        <h1 className="text-center text-[32px] md2:text-[48px] leading-[66px]">
          {title}
        </h1>
      </section>

      <section
        className={`px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-0 lg:gap-x-4 w-full">
          {reservations &&
            reservations.map((reservation) => {
              const { _key, image, alt_text, reservation_link, heading } =
                reservation

              return (
                <div className="flex flex-col space-y-6" key={_key}>
                  <div className="flex flex-col w-full aspect-h-1 aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.349] 3xl:aspect-w-[1.837]">
                    <div className="w-full h-full">
                      <div className="w-full h-full relative">
                        <SanityImage
                          alt={alt_text ?? title ?? 'Event'}
                          src={image}
                          layout="fill"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl md2:text-[32px] cursor-pointer md2:leading-11">
                      {heading}
                    </h2>

                    {reservation.description && (
                      <div className="prose">
                        <SimpleBlockContent blocks={reservation.description} />
                      </div>
                    )}

                    <Link href={reservation_link} passHref>
                      <a className="mt-2 text-primary transition-colors hover:bg-primary max-w-max block hover:text-black font-avenir tracking-[0.05em] text-base leading-[1] md2:text-lg md2:leading-[25px] uppercase opacity-80 py-2.5 px-[30px] border border-primary">
                        Reservations
                      </a>
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}
