import clsx from 'clsx'
import ArticleAuthor from '../articleAuthor'
import ArticleGrid from '../articleGrid'
import ArticleMeta from '../articleMeta'
import SanityImage from '../sanity-image'
import SimpleBlockContent from '../simple-block-content'
import SocialShareButtons from '../socialShareButtons'

export function ArticleLayout(props) {
  const { article } = props

  return (
    <div className="px-4 pb-20">
      <article className="container max-w-[966px] mx-auto">
        <header className="pt-32 lg:pt-48">
          <div className="grid gap-6 mb-7 lg:mb-14">
            <h1 className="text-heading-lg text-center lg:text-heading-xl lg:max-w-[14em] lg:mx-auto">
              {article.title}
            </h1>

            <div className="flex flex-col items-center gap-y-4 md:flex-row md:justify-center md:gap-6 lg:gap-10">
              <ArticleAuthor author={article.author} />
              <ArticleMeta article={article} />
            </div>

            <div className="lg:hidden">
              <SocialShareButtons />
            </div>
          </div>

          {article.image ? (
            <figure className="relative h-[65vw] max-lg:-mx-4 lg:h-[540px]">
              <SanityImage
                src={article.image}
                layout="fill"
                objectFit="cover"
                sizes="(min-width: 1024px) 966px"
              />
            </figure>
          ) : null}
        </header>

        <div className={clsx('pt-10 lg:pt-16')}>
          <div className="lg:relative lg:px-24">
            <div className="max-lg:hidden lg:absolute lg:top-0 lg:left-0 lg:bottom-0">
              <div className="lg:sticky lg:top-[160px] lg:shrink-0">
                <SocialShareButtons />
              </div>
            </div>

            <div className="prose max-w-none lg:prose-h2:text-heading-md">
              <SimpleBlockContent blocks={article.content} />
            </div>
          </div>
        </div>
      </article>

      {article.featuredArticles?.length ? (
        <section className="container max-w-screen-xl mt-10 mx-auto lg:mt-20">
          <h2 className="text-heading-sm mb-4 md:text-center lg:text-heading-md lg:mb-8">
            Keep Reading
          </h2>
          <ArticleGrid articles={article.featuredArticles} />
        </section>
      ) : null}
    </div>
  )
}
