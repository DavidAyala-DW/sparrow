import Image from "next/image"

export default function Newsletter(props) {

  const {title, titleSize, description, descriptionSize, placeholder} = props;

  const titleOptions = {
    "normal" : "text-[32px] vw:text-[1.666vw] leading-[44px] vw:leading-[1.375] font-light mb-6 vw:mb-[1.25vw] ",
    "large" : "text-[48px] vw:text-[2.5vw] leading-[1.2] font-light mb-4 vw:mb-[.8333vw]",
  }

  const descriptionOptions = {
    "normal" : "text-base leading-[1.5] font-normal md:max-w-[551px] vw:max-w-[28.69vw] mb-10 vw:mb-[2.08333vw]",
    "large": "text-base leading-[1.5] font-normal md:max-w-[500px] lg:max-w-[568px] vw:max-w-[29.5833vw] mb-10 vw:mb-[2.08333vw]"
  }

  return (

    <section className='px-4 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col text-[#4A3419]'>

      <h2
        className={`text-center 
        ${ titleSize ? titleOptions[titleSize] : titleOptions["normal"] }`}
      >
        {title}
      </h2>

      <p
        className={`text-center opacity-[.85] md:mx-auto
        ${descriptionSize ? descriptionOptions[descriptionSize] : descriptionOptions["normal"] }`}
      >
        {description}
      </p>

      <form action="" className='w-full flex flex-col'>

        <fieldset className='flex items-center space-x-5 justify-between w-full border-2 vw:border-[.104vw] border-[rgba(74,_52,_25,_0.2)] py-3 vw:py-[.625vw] px-4 lg:pl-6 vw:pl-[1.25vw] lg:pr-[14px] vw:pr-[.729vw] md:max-w-[517px] vw:max-w-[26.9270vw] md:mx-auto'>

          <input
            type="text"
            placeholder={placeholder}
            className="outline-none w-full font-light bg-transparent text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] opacity-80 placeholder:opacity-80 placeholder:text-[rgba(74,_52,_25,_0.5)]"
          />

          <button type="submit" className="w-[26px] vw:w-[1.354vw]">
            <Image
              src="/images/footerArrow.svg"
              alt="White arrow"
              width={26}
              height={19}
              layout="responsive"
            />
          </button>

        </fieldset>        

      </form>

    </section>

  )

}
