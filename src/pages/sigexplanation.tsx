import type { NextPage } from "next";
import Head from "next/head";

const SigExplanation: NextPage = () => {
  return (
    <>
      <Head>
        <title>λ | SignatureExplanation</title>
      </Head>
      <div className="paper">
        <p>The signature can be generated on the command line by using</p>
        <code>
          {'echo "I am <name> and I wish to login" | gpg --clearsign'}
        </code>
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

export default SigExplanation;
