import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import style from 'Common/index.scss'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>

        <body className="app">
          <div>
            <Main />
            <NextScript />
          </div>
        </body>
        <style jsx global>
          {style}
        </style>
      </html>
    )
  }
}
