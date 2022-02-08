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
              className="block h-24 dark:disabled:bg-slate-800 dark:bg-slate-500 disabled:bg-slate-400 w-full p-1 mb-1 rounded-md"
              id="sig"
              name="sig"
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

export const getServerSideProps = () => {
  return { props: {} };
};

export const config = {
  unstable_runtimeJS: false,
};

export default Login;
