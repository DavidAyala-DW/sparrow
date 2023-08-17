import Image from 'next/image'

export default function ArticleMeta(props) {
  const { article } = props

  return (
    <div className="flex flex-wrap items-center gap-6 lg:gap-10">
      <div className="flex items-center gap-2 text-xs lg:text-base">
        <div className="flex pb-0.5">
          <Image
            src="/images/calendarIcon.svg"
            width={14}
            height={15}
            alt="Published:"
          />
        </div>
        <time dateTime={new Date(article.publishDate).toISOString()}>
          {new Date(article.publishDate).toLocaleDateString(undefined, {
            dateStyle: 'long',
          })}
        </time>
      </div>
      <div className="flex items-center gap-2 text-xs lg:text-base">
        <Image
          src="/images/clockIcon.svg"
          width={14}
          height={14}
          alt=""
          aria-hidden="true"
        />
        <p>{article.readTimeMinutes} min read</p>
      </div>
    </div>
  )
}
