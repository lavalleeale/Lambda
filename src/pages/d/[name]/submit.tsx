import type { GetServerSideProps, NextPage, PageConfig } from "next";
import Head from "next/head";
import { getId, userCookie } from "../../../lib/user";

type NewPostProps = { user: userCookie | null; name: string | undefined };

const NewPost: NextPage<NewPostProps> = ({ user, name }) => {
  if (!name) {
    return (
      <div className="paper">
        <p>Section Not Found</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>λ | Submit Post</title>
      </Head>
      <div className="paper overflow-auto">
        <form action={user ? "/api/posts/submit" : "/login"} method="POST">
          <p className="capitalize text-lg">Posting To: {name}</p>
          <label>
            Post Title
            <input
              disabled={user === null}
              id="title"
              name="title"
              className="bg-slate-800 w-full p-1 disabled:bg-slate-500"
            />
          </label>
          <label>
            Post Body
            <textarea
              disabled={user === null}
              id="body"
              name="body"
              className="bg-slate-800 w-full disabled:bg-slate-500"
            />
          </label>
          <button className="btn btn-blue float-right" type="submit">
            {user ? "Post" : "Sign In To Post"}
          </button>
        </form>
      </div>
    </>
  );
};

type NewPostParams = {
  name: string;
};

export const getServerSideProps: GetServerSideProps<
  NewPostProps,
  NewPostParams
> = async (ctx) => {
  if (!ctx.params?.name) {
    return { notFound: true };
  }
  return {
    props: { user: getId(ctx.req), name: ctx.params?.name },
  };
};

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default NewPost;
