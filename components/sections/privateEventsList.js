import SanityImage from "../sanity-image";
import Link from "next/link";
import Image from "next/image";

export default function PrivateEventsList(props) {

  const { title, description, eventsList: events } = props;

  return (

    <>

      <section
        className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-20 md2:pt-[162px] pb-6 md2:pb-[100px]"
      >

        <h1 className="font-light text-center text-[32px] md2:text-[48px] leading-[66px]">
          {title}
        </h1>

        <div className=" font-libreBaskerville text-base max-w-[568px] mx-auto font-normal leading-6 text-center ">
          {description}
        </div>

      </section>

      <section className={`px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col`}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-0 lg:gap-x-4 w-full">

          {
            events && events.map(event => {

              const { _id, title, image, alt_text, book_link, slug } = event.query;

              return (

                <div className="flex flex-col space-y-6" key={_id}>

                  <div className="flex flex-col w-full aspect-h-1 aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.349] 3xl:aspect-w-[1.837]">
                    <Link href={`/private-events/${slug?.current}`} passHref>
                      <a className="w-full h-full">
                        <div className="w-full h-full">
                          <div className="w-full h-full relative">
                            <SanityImage
                              alt={alt_text ?? title ?? "Event"}
                              src={image}
                              layout="fill"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </a>
                    </Link>

                  </div>

                  <div className="flex flex-col space-y-4">

                    <Link href={`/private-events/${slug?.current}`} passHref>
                      <a className="block">
                        <h2 className="text-2xl md2:text-[32px] cursor-pointer font-light md2:leading-11">
                          {title}
                        </h2>
                      </a>
                    </Link>

                  </div>

                </div>

              );

            })
          }

        </div>

      </section>

    </>

  );

}