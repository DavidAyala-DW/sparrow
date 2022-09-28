import SanityImage from "../sanity-image"

export default function ImageFullWidth(props) {

  const {image} = props;

  return (

    <section className="w-full lg:max-w-[94.4%] mx-auto">

      <div className="w-full aspect-h-1 aspect-w-[1.549] md:aspect-w-[2.872] lg:aspect-w-[2.042] 3xl:aspect-w-[2.762]">
        <div className="w-full h-full">
          <div className="w-full h-full relative">
            <SanityImage
              src={image}
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      
    </section>

  )

}
