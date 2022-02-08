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
import { parse } from "cookie";

interface Props {
  user: userCookie | null;
  dark: boolean;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    var dark = true;
    const initialProps = await Document.getInitialProps(ctx);

    if (ctx.req && ctx.req.headers.cookie) {
      const cookie = parse(ctx.req.headers.cookie, {});
      dark = !cookie.light;
    }

    return { ...initialProps, user: getId(ctx.req), dark };
  }

  render() {
    return (
      <Html className={this.props.dark ? "dark" : ""}>
        <Head />
        <body className="dark:bg-gray-800">
          <Header user={this.props.user} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
