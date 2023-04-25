import { useForm } from 'react-hook-form';
import { nopeResolver } from '@hookform/resolvers/nope';
import Nope from 'nope-validator';
import { useEffect, useState } from 'react';
import Field from '../field';
import Checkbox from '../checkbox';
import File from '../inputFile';
import clsx from 'clsx';

export default function Contact(props) {

  const { locations, title, description } = props;
  const [activeOption, setActiveOption] = useState();
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);
  const [sendedMessage, setSendedMessage] = useState(false);

  const schema = Nope.object().shape({
    location: Nope.string().required(),
    name: Nope.string().required(),
    email: Nope.string().email().required(),
    message: Nope.string()
  });

  useEffect(() => {
    setActiveOption("inquiry");
  }, []);

  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(schema) });

  async function onSubmit(values) {

    setDisabledSubmitButton(true);

    const object = {
      ...values,
      consent_emails: "no",
      option: activeOption
    }

    try {

      try {

        await fetch("/api/mailchimp",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: values.email
          })
        });

      } catch (error) {
        console.log(error);
      }

      const request = await fetch("/api/email",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },  
        body: JSON.stringify(object),
      });

      const response = await request.json();
      console.log(response);
      const {status, message} = response;
      if(status == "successful"){
        reset();
        setDisabledSubmitButton(false);
        setSendedMessage(true);
      }

    } catch (error) {
      console.log(error);
    }

  }

  return (

    <section className="px-4 md:px-0 md:max-w-[94.4%] pt-[140px] md:pt-[189px] vw:pt-[9.843vw] w-full mx-auto flex flex-col">

      <h1 className="text-[48px] vw:text-[2.5vw] font-light leading-[66px] vw:leading-[1.375] text-center mb-6 vw:mb-[1.25vw]">
        {title}
      </h1>

      <p className="text-lg text-center mb-4">
        Select Your Location
      </p>

      <div className="grid gap-y-2 mx-auto mb-12 md:grid-cols-2 md:-space-x-px">
        {locations.map((location) => (
          <button
            key={location._id}
            type="button"
            className={clsx(
              'text-lg md:text-[20px] py-2.5 md:py-3 px-8 text-center text-[#EAEBEF] border-[#EAEBEF] border cursor-pointer transition-colors',
              location.title == watch('location') && 'text-body bg-[#EAEBEF]'
            )}
            onClick={() => setValue('location', location.title)}
          >
            {location.title}
          </button> 
        ))}
      </div>
      
      <div className={clsx('transition', !watch('location') && 'blur-sm pointer-events-none')}>
        <p className="opacity-[.85] md:max-w-[430px] vw:max-w-[22.39vw] md:mx-auto text-[20px] md:text-[24px] vw:text-[1.25vw] leading-[25px] md:leading-[30px] vw:leading-[1.25] text-center font-normal mb-16 md:mb-[90px] vw:mb-[4.6875vw]">
          {description}
        </p>

        <div className="flex flex-col space-y-[30px] md:space-y-0 md:grid md:grid-cols-[51%_calc(49%-44px)] md:gap-x-[44px] md:gap-y-7 lg:flex lg:flex-row lg:space-x-[22px] vw:space-x-[1.1458vw] w-max mx-auto mb-20 vw:mb-[4.1666vw]">
          <Checkbox {...{ activeOption }} {...{ setActiveOption }} text="General Inquiry" id="general_inquiry" />
          <Checkbox {...{ activeOption }} {...{ setActiveOption }} text="Reservations" id="reservation" />
          <Checkbox {...{ activeOption }} {...{ setActiveOption }} text="Events" id="events" />
          <Checkbox {...{ activeOption }} {...{ setActiveOption }} text="Press" id="press" />
        </div>

        <form
          className="lg:max-w-[47.08%] mx-auto w-full flex flex-col"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >

          <Field
            className="mb-[26px] vw:mb-[.9375vw]"
            register={register}
            type="text"
            label="Name"
            id="name"
            errors={errors}
            placeholder="Your name"
          />

          <Field
            className="mb-[26px] vw:mb-[1.6666vw]"
            register={register}
            type="email"
            label="Email"
            id="email"
            errors={errors}
            placeholder="Your email"
          />

          {
            activeOption == "press" && (
              <File className="mb-[18px] vw:mb-[.9375vw]" />
            )
          }

          <Field
            className="mb-[26px] md:mb-12 vw:mb-[2.5vw]"
            type="textarea"
            placeholder="How can we help you?"
            register={register}
            label="Message"
            id="message"
          />

            {
              !sendedMessage && (
                <button
                  tabIndex={0}
                  type="submit"
                  {...{"disabled" : disabledSubmitButton }}
                  className="font-avenir text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[.05em] text-center uppercase opacity-80 underline"
                >
                  SEND MESSAGE
                </button>
              )
            }

            {
              sendedMessage && (
                <div className="flex items-center space-x-2.5 justify-center">

                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.2779 17.3085L18.532 9.05433L17.1904 7.74183L10.2779 14.6543L6.77786 11.1543L5.46536 12.4668L10.2779 17.3085ZM11.9987 23.6668C10.4043 23.6668 8.89731 23.3606 7.47786 22.7481C6.05842 22.1356 4.81884 21.2995 3.75911 20.2397C2.69939 19.18 1.86328 17.9404 1.25078 16.521C0.638281 15.1016 0.332031 13.5946 0.332031 12.0002C0.332031 10.3863 0.638281 8.86961 1.25078 7.45016C1.86328 6.03072 2.69939 4.796 3.75911 3.746C4.81884 2.696 6.05842 1.86475 7.47786 1.25225C8.89731 0.639746 10.4043 0.333496 11.9987 0.333496C13.6126 0.333496 15.1293 0.639746 16.5487 1.25225C17.9681 1.86475 19.2029 2.696 20.2529 3.746C21.3029 4.796 22.1341 6.03072 22.7466 7.45016C23.3591 8.86961 23.6654 10.3863 23.6654 12.0002C23.6654 13.5946 23.3591 15.1016 22.7466 16.521C22.1341 17.9404 21.3029 19.18 20.2529 20.2397C19.2029 21.2995 17.9681 22.1356 16.5487 22.7481C15.1293 23.3606 13.6126 23.6668 11.9987 23.6668ZM11.9987 21.9168C14.7598 21.9168 17.1029 20.9495 19.0279 19.0147C20.9529 17.08 21.9154 14.7418 21.9154 12.0002C21.9154 9.23905 20.9529 6.896 19.0279 4.971C17.1029 3.046 14.7598 2.0835 11.9987 2.0835C9.25703 2.0835 6.91884 3.046 4.98411 4.971C3.04939 6.896 2.08203 9.23905 2.08203 12.0002C2.08203 14.7418 3.04939 17.08 4.98411 19.0147C6.91884 20.9495 9.25703 21.9168 11.9987 21.9168Z" fill="white"/>
                  </svg>

                  <p className="text-primary font-light text-[18px] leading-[25px] uppercase opacity-80 font-avenir">
                    Message has been sent
                  </p>

                </div>
              )
            }

        </form>
      </div>
    </section>

  );

}

