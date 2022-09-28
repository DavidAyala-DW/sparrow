import Link from "next/link";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";


export default function MenusContent(props) {

  const router = useRouter()
  const {title, menus, slug, show} = props;
  const [activeMenu, setActiveMenu] = useState();

  useEffect(() => {

    const {menu} = router.query;

    if(!menu){
      setActiveMenu(menus[0]);
      return;
    }

    const menuObject = menus.find( m => m.slug.current == menu );
    setActiveMenu(menuObject);

  }, [router.asPath]);


  const descriptionSizes = {
    small: "max-w-[390px] vw:max-w-[20.3125vw]",
    medium: "max-w-[400px] vw:max-w-[20.8333vw]",
    large: "max-w-[424px] vw:max-w-[22.083vw]"
  }
  


  return (

    <>

      { show && (

        <section 
          className='px-4 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col pt-[120px] md:pt-[130px] lg:pt-[150px] 3xl:pt-[196px] vw:pt-[10.208vw]'
        >

          <h1 className='text-center font-light text-[40px] leading-[1.2] md:text-[48px] vw:text-[2.5vw] md:leading-[60px] vw:leading-[1.25]'>
            {title}
          </h1>

          {
            menus && (

              <div className='mt-4 flex items-center flex-col md:flex-row space-y-[18px] md:space-y-0 md:space-x-6 vw:space-x-[1.25vw] max-w-max mx-auto'>

                {
                  menus.map(menu => {

                    const {title, _key, slug:{current:menuSlug}} = menu;

                    return (

                      <Link
                        href={`/menus/${slug}?menu=${menuSlug}`}
                        passHref
                        key={_key}
                      >
                        <a className={`font-light text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[.05em] uppercase ${ activeMenu?.slug?.current == menuSlug && "underline" }`}>
                          {title}
                        </a>
                      </Link>

                    )

                  })
                }

              </div>

            )

          }

          {
            activeMenu && (

              <div className="mt-[105px] md:mt-20 vw:mt-[4.1666vw] max-w-max mx-auto flex flex-col items-center space-y-20 vw:space-y-[4.1666vw]">

                {
                  activeMenu?.groups?.map(group => {

                    const {_key, title, courses} = group;

                    return (

                      <div
                        key={_key}
                        className="flex flex-col items-center"
                      >

                        <h2 className="text-[24px] vw:text-[1.25vw] leading-[33px] vw:leading-[.75] font-light text-center">
                          {title}
                        </h2>                    

                        {
                          courses && (

                            <div className="mt-8 vw:mt-[1.6666vw] flex flex-col items-center space-y-8 vw:space-y-[1.6666vw]">

                              {
                                courses.map(course => {

                                  const {title, description, _key, extra_text, description_size} = course;
                                  return (

                                    <div key={_key} className="flex flex-col items-center space-y-2 vw:space-y-[.416vw]"
                                    >

                                      <h3 className="font-normal font-libreBaskerville text-lg vw:text-[.9375vw] text-center leading-[22px] vw:leading-[1.222] uppercase">
                                        {title}
                                      </h3>

                                      {
                                        description && (

                                          <div
                                            className={`text-center text-lg vw:text-[.9375vw] leading-[22px] vw:leading-[1.222] italic font-libreBaskerville mx-auto opacity-[.85]
                                             ${ description_size ? descriptionSizes[description_size] : descriptionSizes.medium }
                                            `}>
                                            {description}
                                          </div>

                                        )
                                      }

                                      {
                                        extra_text && (
                                          <p className="text-center italic font-normal text-[12px] vw:text-[.325vw] leading-[15px]  vw:leading-[1.25] opacity-[.85]">
                                            {extra_text}
                                          </p>
                                        )
                                      }

                                    </div>

                                  )

                                })
                              }

                            </div>
                          )
                        }

                      </div>

                    )
                  })
                }

              </div>

            )
          }

        </section>

      )}

    </>

  )
}
