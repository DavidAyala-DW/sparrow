import BackgroundImage from "../backgroundImage";
import SimpleBlockContent from '@/components/simple-block-content'

export default function BannerWithText(props) {

  const {
    title,
    description,
    learn_more,
    backgroundImage,
  } = props;


  return (

    <section className="lg:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col space-y-10 lg:space-y-11 3xl:space-y-20 vw:space-y-[4.1666vw]">

      <div className={`w-full aspect-h-1 aspect-w-[1.44] md:aspect-w-[2.872] lg:aspect-w-[3.278] 3xl:aspect-w-[4.577]`}>

        <div className="w-full h-full">
          <div className="relative w-full h-full">
            <BackgroundImage
              {...{...backgroundImage}}
              className="object-cover"
              layout={"fill"}
            />
          </div>
        </div>

      </div>
      
      <div className="flex flex-col px-4 md:px-10 lg:px-0 ">

        <h2 className="text-[32px] vw:text-[1.666vw] font-light leading-[1.2] md:leading-11 vw:leading-[1.375] capitalize mb-6 3xl:mb-5 vw:mb-[1.0416vw]">
          {title}
        </h2>

        <div className={`font-normal text-base vw:text-base vw:text-[.8333vw] leading-[1.5] opacity-[.85] mb-10 vw:mb-[2.08333] md:max-w-[500px] lg:max-w-[517px] vw:max-w-[26.927vw]`
        }>
          <SimpleBlockContent blocks={description} />
        </div>

        <a
        className="block uppercase text-lg vw:text-[.9375vw] font-light leading-[25px] vw:leading-[1.302] max-w-max tracking-[.05em] underline opacity-80"
        href={learn_more.link}
        >
          {learn_more.title}
        </a>

      </div>

    </section>

  )
}
