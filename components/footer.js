import Link from "next/link";
import Image from "next/image";

export default function Footer(props) {

  const {
    facebookHandle,
    instagramHandle,
    privacyPolicyHandle,
    cookiesPreferencesHandle,
    footerNav,
  } = props;
  
  return (

    <footer className="3xl:justify-between px-4 md:px-0 pb-[22px] md:pb-[36px] md2:pb-[50px] vw:pb-[2.604vw] md:max-w-[94.4%] w-full md:mx-auto flex flex-col md2:flex-row items-stretch">

      <div className="mb-[42px] md2:mb-0 md2:mr-[13.333%] w-max">

        <Link href="/" passHref>

          <a className="block w-[68px] vw:w-[3.541vw]">
            <Image
              src={"/images/logoFooter.svg"}
              width={68}
              height={72}
              alt="Logo"
              layout="responsive"
            />
          </a>

        </Link>

      </div>

      <div className="flex flex-col lg:flex-row lg:items-stretch w-full 3xl:max-w-max">

        <div className="flex flex-col mb-[86px] md2:mb-0 md2:space-y-[110px] vw:space-y-[5.729vw] justify-between md2:mr-[6.7%] 3xl:mr-0 3xl:pr-[10.8333vw] 3xl:w-[calc(19.6875vw_+_10.833vw)] w-full">

          <div className="grid md:max-w-[67.5%] md2:max-w-[78.64%] grid-cols-[1fr,2fr,1fr] md:grid-cols-[1fr,1.5fr,1fr] gap-x-[17px] md:gap-x-16 lg:gap-x-[42px] vw:gap-x-[2.1875vw] gap-y-8 vw:gap-y-[1.6666vw]">

            {footerNav && footerNav.map( (item, i) => {

              const {title,link} = item;

              return (
                <Link href={link?.url} passHref key={i}>
                  <a className={`text-[18px] w-max vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                    {title}
                  </a>
                </Link>
              )

            })}

          </div>

          <div className="hidden md2:flex items-center space-x-[42px] vw:space-x-[2.1875vw]">

            {privacyPolicyHandle && (
              <Link href={privacyPolicyHandle?.link?.url} passHref>
                <a className={`text-[18px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light md:min-w-[107px]`} >
                  {privacyPolicyHandle?.title}
                </a>
              </Link>
            )}

            {cookiesPreferencesHandle && (
              <Link href={cookiesPreferencesHandle?.link?.url} passHref>  
                <a className={`text-[18px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                  {cookiesPreferencesHandle?.title}
                </a>
              </Link>
            )}

          </div>

        </div>

        <div className="flex flex-col space-y-16 md2:space-y-[110px] vw:space-y-[5.729vw] justify-between w-full 3xl:w-[26.927vw]">

          <div className="flex flex-col space-y-6 md2:space-y-8 vw:space-y-[1.666vw]">

            <h3 className="block font-brandom text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light">
              Newsletter
            </h3>  

            <form className="w-full md:max-w-[70%] md2:max-w-full" action="">

              <fieldset className="flex pl-4 md2:pl-6 vw:pl-[1.25vw] pr-7 md2:pr-[14px] vw:pr-[.729vw] item-center space-x-5 vw:space-x-[1.0416vw] border-2 border-[rgba(234,_235,_239,_0.2)] py-3 vw:py-[.625vw]">

                <input
                  className="text-base md2:text-lg vw:text-[.9375vw] bg-transparent outline-none w-full
                  placeholder:text-[rgba(234,_235,_239,1)] md:placeholder:text-[rgba(234,_235,_239,_0.5)] leading-[1.5] font-light opacity-80"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                />

                <button type="submit" className="w-[26px] vw:w-[1.354vw]">
                  <Image
                    src="/images/footerArrow.svg"
                    alt="White arrow"
                    width={26}
                    height={19}
                    layout="responsive"
                  />
                </button>

              </fieldset>
              
            </form>

          </div>

          <div className="flex flex-col space-y-12 md2:space-y-0 md2:flex-row md2:items-center justify-between">

            <div className="flex items-center space-x-6 vw:space-x-[1.25vw]">

              <a href={facebookHandle} className="block w-8 vw:w-[1.666vw]">

                <Image
                  src={"/images/facebook.svg"}
                  alt="facebook logo"
                  layout="responsive"
                  width={32}
                  height={32}
                />

              </a>

              <a href={instagramHandle} className="block w-8 vw:w-[1.666vw]">

                <Image
                  src={"/images/instagram.svg"}
                  alt="instagram logo"
                  layout="responsive"
                  width={32}
                  height={32}
                />

              </a>

            </div>

            <div className="flex md2:hidden items-center space-x-[35px] vw:space-x-[1.822vw]">

              {privacyPolicyHandle && (
                <Link href={privacyPolicyHandle.link.url} passHref>
                  <a className={`text-[18px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                    {privacyPolicyHandle.title}
                  </a>
                </Link>
              )}
              
              {
                cookiesPreferencesHandle && (
                  <Link href={cookiesPreferencesHandle.link.url} passHref>
                    <a className={`text-[18px] vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                      {cookiesPreferencesHandle.title}
                    </a>
                  </Link>
                )
              }

            </div>

            <p className="block opacity-80 text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light font-avenir">
              ©2022 Sparrow
            </p>

          </div>

        </div>


      </div>


    </footer>

  )

}
