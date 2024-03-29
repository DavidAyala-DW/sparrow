import Link from 'next/link'
import SanityImage from '../sanity-image'

export default function Menus(props) {
  const { title, locations } = props
  return (
    <>
      <section className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-[162px] pb-[72px]">
        <h1 className="text-center text-[48px] leading-[66px]">{title}</h1>
      </section>

      <section
        className={`px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-0 lg:gap-x-4 w-full">
          {locations &&
            locations.map((location) => {
              const { title, image, menus, slug, _key } = location

              return (
                <div key={_key} className="flex flex-col space-y-6">
                  <div className="flex flex-col w-full aspect-h-1 aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.349] 3xl:aspect-w-[1.837]">
                    <div className="w-full h-full">
                      <div className="w-full h-full relative">
                        <Link href={`/locations/${slug?.current}`}>
                          <a>
                            <SanityImage
                              src={image}
                              layout="fill"
                              alt={title}
                              className="object-cover cursor-pointer"
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <h2 className="text-[32px] leading-11">{title}</h2>

                    <div className="flex flex-col md:flex-row md:items-center md:flex-wrap max-w-[500px]">
                      {menus &&
                        menus.map((menu) => {
                          const { _key, title, slug: slugMenu } = menu

                          return (
                            <Link
                              key={_key}
                              href={`/menus/${slug?.current}?menu=${slugMenu?.current}`}
                              passHref
                            >
                              <a className="opacity-80 tracking-[.05em] uppercase text-lg leading-[25px] underline pr-6 pb-4">
                                {title}
                              </a>
                            </Link>
                          )
                        })}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}
