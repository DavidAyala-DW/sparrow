import { getPreviewRedirectUrl } from '@/lib/get-preview-redirect-url'

export default function handler(req, res) {
  res.clearPreviewData()

  res.writeHead(307, {
    Location: getPreviewRedirectUrl(req),
  })

  return res.end()
}
