import SimpleBlockContent from '@/components/simple-block-content'

export default function Richtext(props) {
  const { title, text } = props

  return (
    <section className="px-4 md:px-0 md:max-w-[93.3%] pt-[120px] md:pt-[173px] vw:pt-[9.0104vw] w-full mx-auto flex flex-col richtext-page">
      <h1 className="mb-20 vw:mb-[4.16666vw] tracking-[.05em] text-[32px] md:text-[40px] vw:text-[2.0833vw] leading-[1.2] font-extralight text-center">
        {title}
      </h1>

      <div className="prose mx-auto md:prose-lg">
        <SimpleBlockContent blocks={text} />
      </div>
    </section>
  )
}
