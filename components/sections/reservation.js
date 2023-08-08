import SanityImage from '../sanity-image'

export default function Reservation(props) {

  const {reservation_links, reservation_title, title, reservation_image} = props;

  return (
    <>
      <section className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-[110px] md:pt-[162px] pb-6 md2:pb-[100px]">
        <h1 className="font-light text-center text-[32px] md2:text-[48px] leading-[66px]">
          {title}
        </h1>
      </section>

      <section className='px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col'>
         <div className="md:max-w-[680px] vw:max-w-[50%] mx-auto flex flex-col w-full">
          <div className="aspect-h-1 aspect-w-[1.38] w-full relative mb-10 vw:mb-[2.08vw]">
            <div className="inset-0 w-full h-full absolute flex flex-col">
              <SanityImage
                src={reservation_image}
                layout="fill"
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </div>

          <h2 className='text-[36px] vw:text-[1.875vw] mb-5 vw:mb-[1.04vw]'>
            {reservation_title}
          </h2>

          <div className="flex items-center flex-wrap w-full gap-10 vw:gap-[2.08vw]">
            {
              reservation_links.map((reservation_link, index) => {
                return (
                  <a
                    key={reservation_link.text.concat(index)}
                    href={reservation_link.link}
                    className='text-lg vw:text-[.9375vw] font-light tracking-[.9px] underline uppercase'
                  >
                    {reservation_link.text}
                  </a>
                )
              })
            }
          </div>

         </div>
      </section>
    </>
  )

}
