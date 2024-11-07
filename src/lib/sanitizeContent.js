import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

export function sanitizeContent(content) {
  if (typeof window === 'undefined') {
    const { window } = new JSDOM('')
    const purify = DOMPurify(window)
    return purify.sanitize(content)
  } else {
    return DOMPurify.sanitize(content)
  }
}
