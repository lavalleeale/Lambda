import type { NextPage } from "next";
import Head from "next/head";
import Login from "../components/Login";

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

export const getServerSideProps = () => {
  return { props: {} };
};

export const config = {
  unstable_runtimeJS: false,
};

export default LoginPage;
