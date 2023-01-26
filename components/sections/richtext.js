import SimpleBlockContent from '@/components/simple-block-content'

export default function Richtext(props) {

  const {title, text} = props;

  return (

    <section className="px-4 md:px-0 md:max-w-[93.3%] pt-[120px] md:pt-[173px] vw:pt-[9.0104vw] w-full mx-auto flex flex-col richtext-page">

      <h1 className="opacity-90 mb-20 vw:mb-[4.16666vw] uppercase tracking-[.05em] text-[32px] md:text-[40px] vw:text-[2.0833vw] leading-[1.2] font-extralight text-center">
        {title}
      </h1>

      <div className=" md:max-w-[90%] lg:max-w-[65%] font-light mx-auto w-full text-lg vw:text-[.9375vw] leading-[21px] vw:leading-[1.1666]">
        <SimpleBlockContent blocks={text} />
      </div>

    </section>

  )

}
