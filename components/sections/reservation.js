import SanityImage from '../sanity-image'

export default function Reservation(props) {
  const {
    reservation_links,
    reservation_title,
    title,
    subtitle,
    reservation_image,
  } = props

  return (
    <>
      <section className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-[140px] md:pt-[162px] pb-16 md:pb-6 md2:pb-[42px] space-y-1">
        <h1 className="font-light text-center text-[50px] leading-[1]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[36px] text-center leading-[1]">{subtitle}</p>
        )}
      </section>

      <section className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col">
        <div className="flex flex-col w-full md:grid md:grid-cols-3 gap-11 md:gap-3">
          {Array.isArray(reservation_links) &&
            reservation_links.map((reservation) => {
              return (
                <div className="flex flex-col" key={reservation?._key}>
                  {reservation.image && (
                    <a href={reservation.link} className="aspect-h-1 aspect-w-[1.10] w-full relative mb-6 md:mb-10 vw:mb-[2.08vw]">
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
                    className="text-lg vw:text-[.9375vw] font-light tracking-[.9px] underline uppercase mb-[22px] vw:mb-[1.14vw]"
                  >
                    {reservation.text}
                  </a>

                  <div className='text-lg leading-[1.5] tracking-[-0.72px] vw:text-[.9375vw]'>
                    {reservation?.description}
                  </div>

                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}
