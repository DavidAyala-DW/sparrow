import Script from 'next/script'

export default function Userway(props) {
  const { id } = props

  if (!id) {
    return null
  }

  return (
    <>
      <Script id="userway">
        {`
          (function (d) {
            var s = d.createElement('script');
            s.setAttribute('data-account', '${id}');
            s.setAttribute('src', 'https://cdn.userway.org/widget.js');
            (d.body || d.head).appendChild(s);
          })(document);
        `}
      </Script>

      <div
        dangerouslySetInnerHTML={{
          __html: `    
            <noscript>Please ensure Javascript is enabled for purposes of <a href="https://userway.org">website accessibility</a></noscript>
          `,
        }}
      />
    </>
  )
}
