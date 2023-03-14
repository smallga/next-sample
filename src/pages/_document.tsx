import Header from '@/layout/Header'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="pt-12">
        <Header></Header>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
