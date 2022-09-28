import React from 'react'

export default function Field(props) {
  const {
    register,
    type,
    label,
    id,
    errors = {},
    placeholder = "",
    className,  
  } = props;

  const error = Object.keys(errors).length != 0 ? errors[id] : null;

  return (

    <div
      className={`flex flex-col w-full ${className} `}
    >

      <fieldset
        className={`flex flex-col space-y-2 md:space-y-1 vw:space-y-[.2083vw] w-full`}
      >

        <label
          htmlFor={id}
          className={`block text-lg vw:lg-[.9375vw] leading-[22px] vw:leading-[1.38888] font-normal`}
        >
          {label}
        </label>

        {

          type !== "textarea" && (

            <input
              {...register(id)}
              className={`
              outline-none bg-transparent border-[.5px] border-[#4A3419]
              w-full block py-3 md:py-4 vw:py-[.8333vw] px-4 md:px-5 vw:px-[1.0416vw] opacity-[.85] text-lg vw:text-[.1.0416vw] md:text-[20px] leading-[22px] vw:leading-[1.1] font-normal
              placeholder:text-[#4A3419]
              `}
              type={type}
              name={id}
              id={id}
              placeholder={placeholder}
            />

          )

        }

        {

          type === "textarea" && (
          
            <textarea
              {...register(id)}
              name={id}
              id={id}
              value={placeholder}
              className={`
              outline-none bg-transparent border-[.5px] border-[#4A3419]
              w-full block py-3 md:py-4 vw:py-[.8333vw] px-4 md:px-5 vw:px-[1.0416vw] opacity-[.85] text-lg md:text-[20px]  vw:text-[1.0416vw] leading-[22px] vw:leading-[1.1] font-normal
              placeholder:text-[#4A3419] resize-none min-h-[180px] vw:min-h-[9.375vw]
              `}
            >
            </textarea>

          )

        }
        
      </fieldset>
        
      {
        error && (

          <div className="text-red-500 mt-2 vw:mt-[.416vw] font-normal">
            {error?.message}
          </div>

        )
      }

    </div>

  )

}
