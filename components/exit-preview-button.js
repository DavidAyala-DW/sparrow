export default function ExitPreviewButton(props) {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/exit-preview"
      className="fixed bottom-4 left-4 z-[9999] max-w-[360px] px-5 py-2.5 bg-[white] text-black"
    >
      <span className="font-medium text-black">
        You&apos;re viewing the site in preview mode.
      </span>{' '}
      Click here to exit.
    </a>
  )
}
