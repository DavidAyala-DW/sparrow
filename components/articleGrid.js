import ArticleCard from './articleCard'

export default function ArticleGrid(props) {
  const { articles } = props

  if (!articles?.length) {
    return null
  }

  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {articles.map((article) => (
        <li key={article._id}>
          <ArticleCard
            article={article}
            imageSizes="(min-width: 768px) 50vw, (min-width: 1024px) 33vw, (min-width: 1970px) 625px"
          />
        </li>
      ))}
    </ol>
  )
}
