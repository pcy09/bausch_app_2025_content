import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <div id={'modal-root'} />
        <div id={'popup-root'} />
        <div id={'loading-root'} />
        <div id={'drawer-root'} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
