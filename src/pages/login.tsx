import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>λ | Login</title>
      </Head>
      <div className="paper overflow-auto">
        <form action="/api/signup" method="POST">
          <label>
            Signature{" "}
            <Link href="/sigexplanation">
              <a className="">?</a>
            </Link>
            <textarea
              className="block h-24 w-full m-1 bg-slate-800"
              id="sig"
              name="sig"
              placeholder="-----BEGIN PGP SIGNED MESSAGE-----..."
            />
          </label>
          <button className="btn btn-blue float-right" type="submit">
            Login / Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export const config = {
  unstable_runtimeJS: false,
};

export default Login;
