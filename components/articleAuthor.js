import SanityImage from './sanity-image'

export default function ArticleAuthor(props) {
  const { author } = props

  return (
    <address className="flex items-center gap-2 not-italic lg:gap-2.5">
      <div className="flex max-lg:w-[24px] max-lg:h-[24px]">
        <SanityImage
          src={author.image}
          width={38}
          height={38}
          className="rounded-full"
          quality={100}
        />
      </div>
      <span className="text-xs lg:text-base">{author.name}</span>
    </address>
  )
}
