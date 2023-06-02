import SimpleBlockContent from '@/components/simple-block-content'
import SanityImage from '../sanity-image'

const TestSection = (props) => {
  const { title, description: text, image } = props
  return (
    <div className="max-w-[800px] mx-auto flex flex-col space-y-10">
      <h1 className="text-center text-xl font-light">{title}</h1>
      <div className="max-w-[90%] mx-auto w-full">
        <SimpleBlockContent blocks={text} />
      </div>
      <div className="">
        <SanityImage src={image} />
      </div>
    </div>
  )
}

export default TestSection
