import {
  DocumentHeadTags,
  type DocumentHeadTagsProps,
} from "@mui/material-nextjs/v14-pagesRouter";
import { DocumentProps, Head, Html, Main, NextScript } from "next/document";

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
