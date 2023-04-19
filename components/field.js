import React from 'react';

export default function Field(props) {
  const {
    register,
    type,
    label,
    id,
    errors = {},
    placeholder = "",
    className,
    options = []
  } = props;

  const error = Object.keys(errors).length != 0 ? errors[id] : null;

  return (

    <div
      className={`flex flex-col w-full ${className} `}
      style={{ colorScheme: 'dark' }}
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

          type !== "textarea" && type !== 'select' && (

            <input
              {...register(id)}
              className={`
              outline-none bg-transparent border-[.5px] border-[#EAEBEF]
              w-full block py-3 md:py-4 vw:py-[.8333vw] px-4 md:px-5 vw:px-[1.0416vw] opacity-[.85] text-lg vw:text-[.1.0416vw] md:text-[20px] leading-[22px] vw:leading-[1.1] font-normal
              placeholder:text-[#EAEBEF]
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
              placeholder={placeholder}
              className={`
              outline-none bg-transparent border-[.5px] border-[#EAEBEF]
              w-full block py-3 md:py-4 vw:py-[.8333vw] px-4 md:px-5 vw:px-[1.0416vw] opacity-[.85] text-lg md:text-[20px]  vw:text-[1.0416vw] leading-[22px] vw:leading-[1.1] font-normal
              placeholder:text-[#EAEBEF] resize-none min-h-[180px] vw:min-h-[9.375vw]
              `}
            >
            </textarea>

          )

        }

        {
          type === "select" && (
            <div className='flex flex-col w-full relative'>
              <select
                {...register(id)}
                name={id}
                id={id}
                placeholder={placeholder}
                className={`
              outline-none bg-transparent border-[.5px] border-[#EAEBEF] remove-select-caret
              w-full block py-3 md:py-4 vw:py-[.8333vw] px-4 md:px-5 vw:px-[1.0416vw] opacity-[.85] text-lg md:text-[20px]  vw:text-[1.0416vw] leading-[22px] vw:leading-[1.1] font-normal
                  placeholder:text-[#EAEBEF]
                  `}
              >
                {
                  options.map((option, index) => (
                    <option key={index} value={option.value} className='bg-body p-2 text-[#EAEBEF]'>{option.label}</option>
                  ))
                }
              </select>

              <div className="absolute w-6 h-6 top-[calc(50%-12px)] right-5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
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

  );

}
