import type { NextPage } from "next";
import Head from "next/head";
import Login from "../components/Login";
import { withSessionSsr } from "../lib/user";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>λ | Login</title>
      </Head>
      <Login />
    </>
  );
};

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  if (req.headers.referer && !req.headers.referer.includes("login")) {
    req.session.loginContinueTo = req.headers.referer;
    await req.session.save();
  }
  return { props: {} };
});

export const config = {
  unstable_runtimeJS: false,
};

export default LoginPage;
