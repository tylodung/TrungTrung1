/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

'use strict';

import React, {Component} from 'react';

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    console.error(e);
  }
}

	const GoogleAdSenseSetup = buildGoogleAdSense();

const JS_NPM_URLS = [
  '//unpkg.com/docsearch.js@2.4.1/dist/cdn/docsearch.min.js',
];

export default class HTML extends Component {
  render() {
    let css;
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{__html: stylesStr}}
        />
      );
    }

    const js = JS_NPM_URLS.map(url => <script key={url} src={url} />);

    return (
      <html lang="en">
        <head>
		<script async src='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' />
		  { process.env.NODE_ENV === 'production' ? GoogleAdSenseSetup : null }
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/bakadono-144@.png" />
          {this.props.headComponents}
          {js}
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{__html: this.props.body}}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}

function buildGoogleAdSense() {
  const js = `
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: 'ca-pub-idhere',
    enable_page_level_ads: true
  });
  `;

  return <script
    dangerouslySetInnerHTML={{ __html: js }}
  />;
}