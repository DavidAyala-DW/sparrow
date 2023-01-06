import Link from "next/link";
import Header from './header'
import Head from "next/head"
import Footer from './footer'

function Layout(props) {

  const {
    children,
    stickyHeader,
    siteSettings:{
      mainNav,
      menuImage,
      secondHeaderNav,
      footerNav,
      facebookHandle,
      instagramHandle,
      privacyPolicyHandle,
      cookiesPreferencesHandle,
      spotifyHandle,
      soundCloudHandle,
      reservationsButton,
      footer_noble_link,
      newsletter_text
    },
    menus,
    locations
  } = props

  const globalMenus = [
    mainNav,
    secondHeaderNav,
    footerNav
  ]

  const setGlobalURL = [
    privacyPolicyHandle,
    cookiesPreferencesHandle,
    reservationsButton,
  ]

  setGlobalURL.forEach(menuItem => {
    
    if (!menuItem) return;    

    const {slug} = menus.find(item => item._id == menuItem?.link?._ref) ?? false;
    
    if(!slug) {

      if(!menuItem?.link){
        menuItem.link = {};
      }

      menuItem.link.url = "/";

      if (menuItem.externalLink) {
        menuItem.link.url = menuItem.externalLink;
      }

      return;
    }

    menuItem.link.url = slug.current != "/" ? `/${slug.current}`: "/"; 

    if (menuItem.externalLink) {
      menuItem.link.url = menuItem.externalLink;
    }

  })
  
  globalMenus.forEach(menuItem => {

    if(!menuItem) return;
    
    menuItem.forEach(menu => {

      let isLocation = false;

      if(!menu) return;
      
      let {slug} = menus.find(item => item._id == menu?.link?._ref) ?? false;

      if(!slug){
        const {slug:slugLocation} = locations.find(item => item._id == menu?.link?._ref) ?? false;
        slug = slugLocation
        slug ? isLocation = true : null;
      }

      if(!slug) {

        if(!menu?.link){
          menu.link = {};
        }

        menu.link.url = "/";
        if (menu.externalLink) {
          menu.link.url = menu.externalLink;
        }
        return;

      }

      if(!isLocation){
        menu.link.url = slug.current != "/" ? `/${slug.current}`: "/"; 
      }else{
        menu.link.url = slug.current != "/" ? `/locations/${slug.current}`: "/"; 
      }
      

      if (menu.externalLink) {
        menu.link.url = menu.externalLink;
      }

    })
  });

  return (
    <>

      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
      </Head>
    
      <div
      className="bg-body flex flex-col"
      >

        <Header {...{
          mainNav,
          menuImage,
          secondHeaderNav,
          facebookHandle,
          instagramHandle,
          spotifyHandle,
          soundCloudHandle,
          reservationsButton,
          menus,
          locations,
          stickyHeader
        }}/>

        <div className="w-full min-h-screen flex flex-col relative">
          {children}
        </div>

        <Footer {...{
          facebookHandle,
          instagramHandle,
          spotifyHandle,
          soundCloudHandle,
          menus,
          privacyPolicyHandle,
          cookiesPreferencesHandle,
          footerNav,
          footer_noble_link,
          newsletter_text
        }}/>

        {(reservationsButton && (

          <Link passHref href={reservationsButton?.link?.url}>
            <a                      
              className="fixed bottom-0 inset-x-0 w-full md:hidden z-[5] bg-body border-t border-[#EAEBEF] py-[13px]"
            >
              <p className="text-center text-[#BDBEC1] opacity-80  uppercase tracking-[0.05em] text-base font-light leading-[22px] w-full !font-brandom">
                {reservationsButton?.title}
              </p>              
            </a>
          </Link>

        ))}

      </div>
    </>
  )
}

export default Layout
