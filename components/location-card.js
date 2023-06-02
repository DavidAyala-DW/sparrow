import SanityImage from './sanity-image'

export default function LocationCard(props) {
  const { location, children } = props

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full aspect-h-1 aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.349] 3xl:aspect-w-[1.837]">
        <div>
          <div className="w-full h-full relative">
            <SanityImage
              alt={location.title}
              src={location.image}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl md2:text-[32px]">{location.title}</h2>

        {children}
      </div>
    </div>
  )
}
