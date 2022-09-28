import Link from "next/link";

export default function SanityLink(props) {

  const {
    links:{
      internalLink,
      externalLink,
    },
    className,
    children
  } = props;
  
  const link = (externalLink ? externalLink : internalLink) ?? "/";

  return (

    <Link href={link} passHref>

      <a className={className}>
        {children}
      </a>      

    </Link>

  )

}
