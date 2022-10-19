import SimpleBlockContent from '@/components/simple-block-content'

export default function TextContentCenter(props) {

  const {
    title,
    description,
    description2,
    learn_more,
    mobileAlignment,
    titleSize,
    descriptionContent
  } = props;

  return (

    <section className='px-4 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col'>
      
      <div className="flex flex-col">

        <h2 className={`capitalize
          ${(mobileAlignment && mobileAlignment == "left") ? "text-left md:text-center" : "text-center" }
          ${ (titleSize && titleSize == "large") && "text-[40px] lg:text-[48px] vw:text-[2.5vw] leading-[1.2] lg:leading-[66px] vw:leading-[1.375]"}
          ${ (titleSize && titleSize == "normal") && "text-[32px] lg:text-[32px] vw:text-[1.666vw] leading-[1.2] lg:leading-[44px] vw:leading-[1.375]"}
          ${ (titleSize && titleSize == "small") && "text-[24px] lg:text-[32px] vw:text-[1.666vw] leading-[1.2] lg:leading-[44px] vw:leading-[1.375]"}
          font-light mb-6 lg:mb-4 vw:mb-[.8333vw]
        `}>
          {title}
        </h2>

        <div className={`
          ${(mobileAlignment && mobileAlignment == "left") ? "text-left md:text-center" : "text-center" }
          md:max-w-[500px] mx-auto text-base vw:text-[.8333vw] leading-[1.5] opacity-80 mb-10 vw:mb-[2.08333vw]
          ${ (descriptionContent && descriptionContent == "small") && "lg:max-w-[551px] vw:max-w-[28.69vw]"}
          ${ (descriptionContent && descriptionContent == "normal") && "lg:max-w-[572px] vw:max-w-[29.791vw]"}
          ${ (descriptionContent && descriptionContent == "large") && "lg:max-w-[678px] vw:max-w-[35.3125vw]"}
          `}
        >

          {
            (description && !description2) && (
              <p>
              {description}
              </p>              
            )
          }

          {
            (description2) && (
              <SimpleBlockContent blocks={description2} />
            )
          }

        </div>

        {
          learn_more && (
            <a
            className={`
              block ${(mobileAlignment && mobileAlignment == "left") ? "mr-auto md:mx-auto" : "mx-auto" }
              max-w-max text-center uppercase opacity-80 tracking-[.05em] text-lg leading-[25px] vw:text-[.9375vw] vw:leading-[1.3888] font-light underline
            `}
            href={learn_more?.link}
          >
            {learn_more?.title}
          </a>
          )
        }

      </div>
      
    </section>

  )

}
