import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Footer(props) {

  const [sendedEmail, setSendedEmail] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const email = useRef(null);

  async function handleSubmit(e){
    console.log(email);    
    e.preventDefault();

    const value = email.current.value;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

    if(regex.test(value)){

      setSendingEmail(true);

      try {
        
        const request = await fetch("/api/mailchimp",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: value
          })
        });

        const response = await request.json();
        const {status, message} = response;

        if(status === "successful"){
          email.current.value = message;
          email.current.readOnly = true;
          setSendedEmail(true);
        }


      } catch (error) {
        console.log(error);
        setSendingEmail(false);
      }


    }

  }

  const {
    facebookHandle,
    instagramHandle,
    spotifyHandle,
    soundCloudHandle,
    privacyPolicyHandle,
    cookiesPreferencesHandle,
    footerNav,
    footer_noble_link,
    newsletter_text
  } = props;

  return (

    <footer className="3xl:justify-between px-4 md:px-0 pb-[22px] md:pb-[36px] md2:pb-[50px] vw:pb-[2.604vw] md:max-w-[94.4%] w-full md:mx-auto flex flex-col md2:flex-row items-stretch">

      <div className="shrink-0 selection:first:mb-[42px] md2:mb-0 md2:mr-[10%]">

        <Link href="/" passHref>

          <a>
            <Image
              src="/images/logo.png"
              width={170}
              height={80}
              quality={100}
              alt="Sparrow Italia"
              objectFit="contain"
              objectPosition="left top"
            />
          </a>

        </Link>

      </div>

      <div className="flex flex-col lg:flex-row lg:items-stretch w-full 3xl:max-w-max">

        <div className="flex flex-col mb-[86px] md2:mb-0 md2:space-y-[110px] vw:space-y-[5.729vw] justify-between md2:mr-[6.7%] 3xl:mr-0 3xl:pr-[10.8333vw] 3xl:w-[calc(19.6875vw_+_10.833vw)] w-full">

          <div className="grid md:max-w-[67.5%] md2:max-w-[78.64%] grid-cols-[1fr,1fr] gap-x-[17px] md:gap-x-16 lg:gap-x-[42px] vw:gap-x-[2.1875vw] gap-y-8 vw:gap-y-[1.6666vw]">

            {footerNav && footerNav.map((item, i) => {

              const { title, link } = item;

              return (
                <Link href={link?.url} passHref key={i}>
                  <a className={`text-[18px] w-max vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                    {title}
                  </a>
                </Link>
              );

            })}

          </div>

          <div className="hidden md2:flex items-center space-x-[16px] vw:space-x-[2.1875vw]">

            {privacyPolicyHandle && (
              <Link href={privacyPolicyHandle?.link?.url} passHref>
                <a className={`text-[14px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                  {privacyPolicyHandle?.title}
                </a>
              </Link>
            )}


            <Link href="/accessibility-statement" passHref>
              <a className={`text-[14px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                Accessibility Statement
              </a>
            </Link>

            <Link href="/website-terms" passHref>
              <a className={`text-[14px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                Website Terms
              </a>
            </Link>

          </div>

        </div>

        <div className="flex flex-col space-y-16 md2:space-y-[110px] vw:space-y-[5.729vw] justify-between w-full 3xl:w-[26.927vw]">

          <div className="flex flex-col space-y-6 md2:space-y-8 vw:space-y-[1.666vw]">

            <h3 className="block font-brandom text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light">
              {newsletter_text ?? "Newsletter"}
            </h3>

            <form onSubmit={handleSubmit} className="w-full md:max-w-[70%] md2:max-w-full" action="">

              <fieldset className="flex pl-4 md2:pl-6 vw:pl-[1.25vw] pr-7 md2:pr-[14px] vw:pr-[.729vw] item-center space-x-5 vw:space-x-[1.0416vw] border-2 border-[rgba(234,_235,_239,_0.2)] py-3 vw:py-[.625vw]">

                <input
                  className="text-base md2:text-lg vw:text-[.9375vw] bg-transparent outline-none w-full
                  placeholder:text-[rgba(234,_235,_239,1)] md:placeholder:text-[rgba(234,_235,_239,_0.5)] leading-[1.5] font-light opacity-80"
                  type="email"
                  name="email"
                  ref={email}
                  aria-label='Email'
                  id="email"
                  placeholder="Enter your email address"
                />

                {
                  !sendedEmail && (
                    <button
                      type="submit"
                      className="w-[26px] vw:w-[1.354vw]"
                      {...{"disabled" : sendingEmail }}
                    >
                    <Image
                      src="/images/footerArrow.svg"
                      alt="White arrow"
                      width={26}
                      height={19}
                      layout="responsive"
                    />
                  </button>
                  )
                }

                {
                  sendedEmail && (
                    <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path d="M12.7875 21.825L23.4 11.2125L21.675 9.525L12.7875 18.4125L8.2875 13.9125L6.6 15.6L12.7875 21.825ZM15 30C12.95 30 11.0125 29.6062 9.1875 28.8187C7.3625 28.0312 5.76875 26.9562 4.40625 25.5937C3.04375 24.2312 1.96875 22.6375 1.18125 20.8125C0.39375 18.9875 0 17.05 0 15C0 12.925 0.39375 10.975 1.18125 9.15C1.96875 7.325 3.04375 5.7375 4.40625 4.3875C5.76875 3.0375 7.3625 1.96875 9.1875 1.18125C11.0125 0.39375 12.95 0 15 0C17.075 0 19.025 0.39375 20.85 1.18125C22.675 1.96875 24.2625 3.0375 25.6125 4.3875C26.9625 5.7375 28.0312 7.325 28.8187 9.15C29.6062 10.975 30 12.925 30 15C30 17.05 29.6062 18.9875 28.8187 20.8125C28.0312 22.6375 26.9625 24.2312 25.6125 25.5937C24.2625 26.9562 22.675 28.0312 20.85 28.8187C19.025 29.6062 17.075 30 15 30ZM15 27.75C18.55 27.75 21.5625 26.5062 24.0375 24.0187C26.5125 21.5312 27.75 18.525 27.75 15C27.75 11.45 26.5125 8.4375 24.0375 5.9625C21.5625 3.4875 18.55 2.25 15 2.25C11.475 2.25 8.46875 3.4875 5.98125 5.9625C3.49375 8.4375 2.25 11.45 2.25 15C2.25 18.525 3.49375 21.5312 5.98125 24.0187C8.46875 26.5062 11.475 27.75 15 27.75Z" fill="white"/>
                    </svg>
                  )
                }

              </fieldset>

            </form>

          </div>

          <div className="flex flex-col space-y-12 md2:space-y-0 md2:flex-row md2:flex-wrap md2:gap-5 md2:items-center justify-between">

            <div className="flex items-center space-x-6 vw:space-x-[1.25vw]">

              {(facebookHandle && <a href={facebookHandle} className="block w-8 vw:w-[1.666vw]">

                <Image
                  src={"/images/facebook.svg"}
                  alt="facebook logo"
                  layout="responsive"
                  width={32}
                  height={32}
                />

              </a>)}

              {(instagramHandle && <a href={instagramHandle} className="block w-8 vw:w-[1.666vw]">

                <Image
                  src={"/images/instagram.svg"}
                  alt="instagram logo"
                  layout="responsive"
                  width={32}
                  height={32}
                />

              </a>)}

              {(spotifyHandle && <a href={spotifyHandle} className="block w-8 vw:w-[1.666vw]">

                <Image
                  src={"/images/spotify.svg"}
                  alt="instagram logo"
                  layout="responsive"
                  width={32}
                  height={32}
                />

              </a>)}

              {(soundCloudHandle && <a href={soundCloudHandle} className="block w-8 vw:w-[1.666vw]">

                <Image
                  src={"/images/soundCloud.svg"}
                  alt="instagram logo"
                  layout="responsive"
                  width={32}
                  height={32}
                />

              </a>)}

            </div>

            <div className="flex md2:hidden items-center space-x-[35px] vw:space-x-[1.822vw]">

              {privacyPolicyHandle && (
                <Link href={privacyPolicyHandle?.link?.url} passHref>
                  <a className={`text-[14px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                    {privacyPolicyHandle?.title}
                  </a>
                </Link>
              )}


              <Link href="/accessibility-statement" passHref>
                <a className={`text-[14px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                  Accessibility Statement
                </a>
              </Link>

              <Link href="/website-terms" passHref>
                <a className={`text-[14px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                  Website Terms
                </a>
              </Link>

            </div>

            {
              footer_noble_link && (
                <Link passHref href={footer_noble_link} >
                  <a className="block !mb-[59px] md:!mb-0">
                    <Image
                      src="/images/noble33-logo.png"
                      alt="Noble 33"
                      width={145}
                      height={30}
                      objectFit="contain"
                    />
                  </a>
                </Link>
              )
            }

          </div>

        </div>


      </div>


    </footer>

  );

}
