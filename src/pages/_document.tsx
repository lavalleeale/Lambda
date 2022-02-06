import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Header from "../components/Header";
import React from "react";
import { getId, userCookie } from "../lib/user";

interface Props {
  user: userCookie | null;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps, user: getId(ctx.req) };
  }

  render() {
    return (
      <Html className="bg-current">
        <Head />
        <body>
          <Header user={this.props.user} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
