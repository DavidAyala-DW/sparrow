import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import Link from "next/link";
import SanityImage from './sanity-image';

export default function Header(props) {

  const router = useRouter();
  const menuButton = useRef();

  const {
    mainNav,
    menuImage,
    secondHeaderNav,
    facebookHandle,
    instagramHandle,
    spotifyHandle,
    soundCloudHandle,
    reservationsButton,
    locations,
    stickyHeader
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [activeMenuImage, setActiveMenuImage] = useState();
  const [existHero, setExistHero] = useState(false);
  const [heroVisible, setHeroVisible] = useState(null);
  const [entryObserver, setEntryObserver] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleClick() {
    const updatedModalValue = !openModal;
    setOpenModal(updatedModalValue);
  }

  function handleMouseOver(image) {
    setActiveMenuImage(image);
  }

  function handleMouseDown() {
    setActiveMenuImage(menuImage);
  }

  useEffect(() => {
    setActiveModal(true);

    if (menuImage) {
      handleMouseDown();
    }

  }, []);

  useEffect(() => {

    const mainHero = document.getElementById("mainHero");

    if (!mainHero) {

      setExistHero(false);

      if (typeof window !== 'undefined') {

        function handleScroll() {

          if (window.scrollY != 0) {
            setExistHero(true);
            setHeroVisible(false);
          } else {
            setExistHero(!true);
            setHeroVisible(!false);
          }

        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll, true);

      }

      return;

    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setEntryObserver(entry.isIntersecting);
        if (entryObserver) {
          setHeroVisible(true);
          return;
        }
        setHeroVisible(false);
      },
      {
        rootMargin: '0px 0px 0px 0px',
        root: null,
        threshold: .45
      }
    );

    observer.observe(mainHero);
    setExistHero(true);

  }, [router.asPath, entryObserver]);

  return (

    <>

      <header
        id="header"
        className={` ${!existHero || !heroVisible || openModal ? "bg-body duration-[200ms]  " : "bg-gradient-to-b from-[#000000bf] to-transparent duration-[300ms]"}
      transition-colors z-[100] 
      ${openModal ? "justify-center md2:!bg-transparent right-0 fixed md2:inset-x-0" : `justify-between ${stickyHeader ? "sticky bg-body" : "fixed inset-x-0"} `} 
      top-0 px-4 md2:px-[2.8%] w-full md2:mx-auto flex items-center md2:justify-between
      py-6 md2:pt-8 vw:pt-[1.666vw] md2:pb-10 vw:pb-[2.0833vw]`}
      >

        <div className={`cursor-pointer order-3 md2:order-1 select-none ${openModal && "absolute right-4 md2:left-0 md2:relative"}`}>

          <div onClick={handleClick} className={`${openModal && "hidden"} w-[25px] vw:!w-[1.302vw]`} role='button' tabIndex={0}>
            <Image
              src={`/images/${existHero ? "burguer.svg" : "burguerBrown.svg"}`}
              alt="burger"
              layout="responsive"
              width={25}
              height={16}
            />
          </div>

          <div onClick={handleClick} className={`${!openModal && "hidden"} w-[21px] vw:!w-[1.09375vw]`} role='button' tabIndex={0}>
            <Image
              src={"/images/close.svg"}
              alt="close"
              layout="responsive"
              width={21}
              height={20}
            />
          </div>

        </div>

        <div className={`order order-1 md2:absolute md2:inset-x-0 md2:w-max md2:top-[14px] vw:top-[.7291vw] md2:m-auto md2:h-max select-none md2:order-2`}>
          <Link href="/" passHref>
            <a onClick={() => setOpenModal(false)} className="block cursor-pointer w-[170px] vw:w-[10vw]">
              <Image
                src="/images/logo.png"
                width={170}
                height={64}
                quality={100}
                alt="Sparrow Italia"
                layout="responsive"
                objectFit="contain"
              />
            </a>
          </Link>
        </div>

        <div className="hidden md2:block order-3 select-none">

          {(reservationsButton && (

            <Link href={reservationsButton?.link?.url}>
              <a onClick={() => setOpenModal(false)}>
                <p className={`font-[390] text-[#E7E3DA] text-base leading-[100%] px-3 py-2 border border-[#E7E3DA] transition-colors vw:text-[.9375vw] vw:leading-[1.388] tracking-[.05em] uppercase hover:text-body hover:bg-[#E7E3DA]`}>
                  {reservationsButton?.title}
                </p>
              </a>
            </Link>

          ))}

        </div>

      </header>

      <div
        className={`fixed inset-0 h-full w-full transition-[transform] !duration-[300ms] ${openModal ? "!translate-x-0" : `${(!activeModal && "invisible")}`} -translate-x-full bg-body
        min-h-screen z-[90] w-full flex items-start`}
      >

        <div
          className={`md2:pl-[2.8%] w-full h-[calc(100%-80px)] md2:h-full max-w-full md2:max-w-[73.6%] 3xl:max-w-[66.666%] flex flex-col items-center
        md2:items-start justify-between pt-[101px] md2:pt-[108px] vw:pt-[5.625vw] pb-6 vw:pb-[1.25vw]`}>

          <div className="w-full flex flex-col md2:flex-row space-y-2 md2:space-y-0 items-start md2:space-x-[150px] vw:space-x-[3.333vw]">

            <div className="w-full md2:w-4/5 flex flex-col items-center md2:items-start">

              {mainNav && mainNav?.map((item, index) => {

                if (index > 4) return;

                const { title, link, image, _key } = item;

                return (

                  <div key={_key}>

                    {
                      title != "Menus" ? (

                        <Link href={link.url} passHref>
                          <a
                            onMouseLeave={handleMouseDown}
                            onMouseEnter={() => handleMouseOver(image)}
                            onClick={handleClick}
                            className="block font-light tracking-[-.04em] text-[32px] md2:text-[55px] vw:text-[2.864vw] leading-[44px] md2:leading-[75px] vw:leading-[1.36]"
                          >
                            {title}
                          </a>
                        </Link>

                      ) : (

                        <div className="flex flex-col items-center md2:items-start">

                          <div className="flex items-center w-full space-x-5 max-w-max mx-auto md2:max-w-full">

                            <Link href={link.url} passHref>
                              <a
                                onMouseLeave={handleMouseDown}
                                onMouseEnter={() => handleMouseOver(image)}
                                onClick={(e) => (e.preventDefault(), setIsMenuOpen(!isMenuOpen))}
                                className="block font-light tracking-[-.04em] text-[32px] md2:text-[55px] vw:text-[2.864vw] leading-[44px] md2:leading-[75px] vw:leading-[1.36]"
                              >
                                {title}
                              </a>
                            </Link>

                            <div onClick={() => { setIsMenuOpen(!isMenuOpen); }} ref={menuButton} className={`cursor-pointer relative transition-transform w-5 h-3 md2:w-7 md2:h-6 vw:w-[1.458vw] vw:h-[.8333vw] ${isMenuOpen ? "rotate-180" : "rotate-0"}`}>
                              <Image
                                src="/images/Down.svg"
                                alt="Down Icon"
                                layout={"fill"}
                              />
                            </div>

                          </div>

                          <div className={`flex-col items-center md2:items-start ${isMenuOpen ? "flex" : "hidden"}`}>

                            {
                              locations && (
                                [...locations].reverse().map((location, i) => {

                                  const { title, slug: { current }, comming_soon, _id } = location;


                                  return (

                                    <div key={_id}>

                                      {
                                        !comming_soon && (
                                          <Link href={`/menus/${current}?menu=dinner-menu`} passHref>
                                            <a
                                              onClick={() => setOpenModal(false)}
                                              className={`
                                                text-[#EAEBEF] text-lg md2:text-[24px] leading-[1.6] tracking-[-.02em] font-normal font-brandom
                                              ${comming_soon ? "opacity-50 !cursor-not-allowed" : "opacity-90"} `}>
                                              {title}
                                            </a>
                                          </Link>
                                        )
                                      }

                                      {
                                        comming_soon && (
                                          <div
                                            className={`
                                            text-[#EAEBEF] text-lg md2:text-[24px] leading-[1.6] tracking-[-.02em] font-normal font-brandom
                                            ${comming_soon ? "opacity-50 !cursor-not-allowed" : "opacity-90"} `}>
                                            {title + "(Coming Soon)"}
                                          </div>
                                        )
                                      }

                                    </div>
                                  );


                                })
                              )
                            }
                          </div>

                        </div>

                      )
                    }

                  </div>
                );



              })}

            </div>

            <div className="flex flex-col w-full items-center md2:items-start">

              {mainNav.map((item, index) => {

                if (index > 4) {

                  const { title, link, image, _key } = item;

                  return (
                    <Link href={link.url} passHref key={_key} >
                      <a
                        onMouseLeave={handleMouseDown}
                        onMouseEnter={() => handleMouseOver(image)}
                        onClick={handleClick}
                        className="block font-light tracking-[-.04em] text-[32px] md2:text-[55px] vw:text-[2.864vw] leading-[44px] md2:leading-[75px] vw:leading-[1.36]"
                      >
                        {title}
                      </a>
                    </Link>
                  );

                }

              })}

              <div className="max-w-max block md2:hidden">
                {(reservationsButton && (

                  <Link href={reservationsButton?.link?.url}>
                    <a
                      onClick={() => setOpenModal(false)}
                      className="block font-light tracking-[-.04em] text-[32px] md2:text-[55px] vw:text-[2.864vw] leading-[44px] md2:leading-[75px] vw:leading-[1.36] hover:text-body hover:bg-[#E7E3DA]"
                    >
                      {reservationsButton?.title}
                    </a>
                  </Link>

                ))}
              </div>

              <div className="pt-6 vw:pt-[1.25vw] hidden md2:flex flex-col space-y-2 vw:space-y-[.416vw]">

                {secondHeaderNav && secondHeaderNav.map((item, i) => {

                  const { title, link, _key } = item;
                  if (!link || !title) return;

                  if (title.includes('Coming Soon'))
                    return (
                      <span key={_key} className="block text-[24px] vw:text-[1.25vw] leading-[1.6] font-light opacity-50 select-none">
                        {title}
                      </span>
                    );

                  return (

                    <Link
                      href={link?.url}
                      passHref key={_key}
                    >
                      <a
                        onClick={handleClick}
                        className="block text-[24px] vw:text-[1.25vw] leading-[1.6] font-light opacity-90"
                      >
                        {title}
                      </a>
                    </Link>

                  );

                })}

              </div>

            </div>

          </div>

          <div className="flex items-center space-x-6 vw:space-x-[1.25vw]">

            {(facebookHandle && <a onClick={handleClick} href={facebookHandle} className="block w-8 vw:w-[1.666vw]">

              <Image
                src={"/images/facebook.svg"}
                alt="facebook logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>)}

            {(instagramHandle && <a onClick={handleClick} href={instagramHandle} className="block w-8 vw:w-[1.666vw]">

              <Image
                src={"/images/instagram.svg"}
                alt="instagram logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>)}

            {(spotifyHandle && <a onClick={handleClick} href={spotifyHandle} className="block w-8 vw:w-[1.666vw]">

              <Image
                src={"/images/spotify.svg"}
                alt="instagram logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>)}

            {(soundCloudHandle && <a onClick={handleClick} href={soundCloudHandle} className="block w-8 vw:w-[1.666vw]">

              <Image
                src={"/images/soundCloud.svg"}
                alt="instagram logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>)}

          </div>

        </div>

        <div className={`hidden ${!activeMenuImage && "bg-body"} lg:flex relative w-full h-full max-w-[26.4%] 3xl:max-w-[33.3333%]`}>

          {
            activeMenuImage && (
              <SanityImage priority={true} className="object-cover" src={activeMenuImage} layout="fill" />
            )
          }

        </div>

      </div>

    </>

  );

}