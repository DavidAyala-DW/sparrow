import Link from 'next/link'
import SanityImage from '../sanity-image'

export default function Reservation(props) {
  const { reservation_links, title, subtitle } = props

  return (
    <>
      <section className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-[140px] md:pt-[162px] pb-16 md:pb-6 md2:pb-[42px] space-y-1">
        <h1 className="text-center text-[50px] leading-[1]">{title}</h1>
        {subtitle && (
          <p className="text-[36px] text-center leading-[1]">{subtitle}</p>
        )}
      </section>

      <section className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col">
        <div className="flex flex-col w-full md:grid md:grid-cols-3 gap-11 md:gap-3">
          {Array.isArray(reservation_links) &&
            reservation_links.map((reservation) => {
              return (
                <div
                  className="flex flex-col justify-between"
                  key={reservation?._key}
                >
                  <div className="flex flex-col">
                    {reservation.image && (
                      <a
                        href={reservation.link}
                        className="aspect-h-1 aspect-w-[1.10] w-full relative mb-6 md:mb-10 vw:mb-[2.08vw]"
                      >
                        <div className="inset-0 w-full h-full absolute flex flex-col">
                          <SanityImage
                            src={reservation.image}
                            layout="fill"
                            alt="Image"
                            className="object-cover object-center"
                          />
                        </div>
                      </a>
                    )}
                    
                    <a
                      href={reservation.link}
                      className="text-lg vw:text-[.9375vw] tracking-[.9px] underline uppercase mb-[22px] vw:mb-[1.14vw]"
                    >
                      {reservation.text}
                    </a>

                    <div className="text-lg leading-[1.5] tracking-[-0.72px] vw:text-[.9375vw]">
                      {reservation?.description}
                    </div>
                  </div>

                  {Array.isArray(reservation.menus_array) &&
                    reservation.menus_array.length > 0 && (
                      <div className="flex items-center flex-wrap mt-8 gap-4">
                        {reservation.menus_array.map((menu) => {
                          return (
                            <Link href={menu?.link} key={menu?._key}>
                              <a passHred className="uppercase underline">
                                {menu?.text}
                              </a>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}
