import Link from 'next/link'
import LocationCard from '../location-card'
import SimpleBlockContent from '../simple-block-content'

export default function GiftCards(props) {
  const { title, description, locations } = props

  return (
    <div>
      <div className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-20 md2:pt-[162px] pb-6 md2:pb-[100px]">
        {title ? (
          <h1 className="text-center text-[32px] md2:text-[48px]">{title}</h1>
        ) : null}

        <div className="max-w-[500px] mx-auto text-center text-lg">
          {description ? <SimpleBlockContent blocks={description} /> : null}
        </div>
      </div>

      <div className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-0 lg:gap-x-4 w-full">
          {locations?.map((location) => (
            <LocationCard key={location._id} location={location.location}>
              <Link href={location.giftCardUrl}>
                <a className="opacity-80 tracking-[.05em] uppercase text-lg leading-[25px] underline pr-6 pb-4">
                  Purchase Gift Card
                </a>
              </Link>
            </LocationCard>
          ))}
        </div>
      </div>
    </div>
  )
}
