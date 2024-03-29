import { parse, serialize } from "cookie";
import { getIronSession, IronSessionData } from "iron-session";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Header from "../components/Header";
import { sessionOptions } from "../lib/user";

interface Props {
  user: IronSessionData["user"] | null;
  dark: boolean;
  path: string;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    var dark = true;
    const initialProps = await Document.getInitialProps(ctx);

    const session =
      ctx.req && ctx.res
        ? await getIronSession(ctx.req, ctx.res, sessionOptions)
        : null;

    if (ctx.query.swapMode === "night") {
      ctx.res?.setHeader("Set-Cookie", serialize("light", "", { path: "/" }));
      dark = true;
    } else if (ctx.query.swapMode === "day") {
      ctx.res?.setHeader(
        "Set-Cookie",
        serialize("light", "yes", { path: "/" })
      );
      dark = false;
    } else if (ctx.req?.headers.cookie) {
      const cookie = parse(ctx.req.headers.cookie, {});
      dark = cookie.light !== "yes";
    }

    return {
      ...initialProps,
      user: session?.user || null,
      dark,
      path: ctx.asPath?.split("?")[0],
    };
  }

  render() {
    return (
      <Html className={this.props.dark ? "dark" : ""}>
        <Head />
        <body className="dark:bg-gray-800 bg-gray-50">
          <Header
            user={this.props.user}
            dark={this.props.dark}
            path={this.props.path}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
