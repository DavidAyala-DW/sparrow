import SanityImage from "../sanity-image";
import Link from "next/link";

export default function Menus(props) {

  const {title, locations} = props;
  return (

    <>

      <section
      className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-[162px] pb-[72px]"      
      >

        <h1 className="font-light text-center text-[48px] leading-[66px]">
          {title}
        </h1>

      </section>

      <section className={`px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col`}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-0 lg:gap-x-4 w-full">

          {
            locations && locations.map(location => {

              const {title, image, menus, slug} = location;

              return ( 

                <div className="flex flex-col space-y-6">

                  <div className="flex flex-col w-full aspect-h-1 aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.349] 3xl:aspect-w-[1.837]">
                    <div className="w-full h-full">
                      <div className="w-full h-full relative">
                        <SanityImage
                          src={image}
                          layout="fill"
                          alt="Image"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
      
                  <div className="flex flex-col space-y-4">
      
                    <h2 className="text-[32px] font-light leading-11">
                      {title}
                    </h2>
      
                    <div className="flex items-center space-x-6">
                      
                      {

                        menus && menus.map(menu => {

                          const {title, slug:slugMenu} = menu;

                          return (
                            <Link href={`/menus/${slug?.current}?menu=${slugMenu?.current}`} passHref>
                              <a className="opacity-80 tracking-[.05em] uppercase text-lg leading-[25px] font-light underline">
                                {title}
                              </a>
                            </Link>
                          )

                        })

                      }
            
                    </div>
      
                  </div>
      
                </div> 

              )


            })
          }

        </div>

      </section>

    </>

  )
}
