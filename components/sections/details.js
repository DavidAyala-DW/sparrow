import Detail from "../detail";

export default function Details(props) {

  const {details} = props;

  return (

    <section className="px-4 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col">

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-y-16 lg:gap-y-[120px] vw:gap-y-[6.25vw] lg:gap-x-[33px] vw:gap-x-[1.718vw]">
      
        {
          details.map( detail => {

            const {_key} = detail;

            return(
              <Detail detail={detail} key={_key} />
            )

          })
        }

      </div>

    </section>

  )

}