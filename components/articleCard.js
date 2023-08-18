import clsx from 'clsx'
import Link from 'next/link'
import ArticleAuthor from './articleAuthor'
import ArticleMeta from './articleMeta'
import SanityImage from './sanity-image'

export default function ArticleCard(props) {
  const {
    article,
    size = 'normal', // 'normal' | 'large'
    imageSizes,
  } = props

  return (
    <Link href={article.url}>
      <a className="font-havre">
        <article className="flex flex-col items-start gap-3">
          <div
            className={clsx(
              'w-full aspect-w-[1.7] aspect-h-1',
              size === 'large' && 'lg:mb-3'
            )}
          >
            <figure>
              <SanityImage
                src={article.image}
                layout="fill"
                objectFit="cover"
                sizes={imageSizes}
              />
            </figure>
          </div>
          <ArticleMeta article={article} />
          <h3
            className={clsx(
              'text-heading-sm',
              size === 'large' && 'lg:text-heading-md'
            )}
          >
            {article.title}
          </h3>
          {size === 'large' ? (
            <div className="font-avenir max-lg:hidden">
              <ArticleAuthor author={article.author} />
            </div>
          ) : null}
        </article>
      </a>
    </Link>
  )
}
