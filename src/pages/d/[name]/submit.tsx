import { IronSessionData } from "iron-session";
import type { NextPage, PageConfig } from "next";
import Head from "next/head";
import { withSessionSsr } from "../../../lib/user";

type NewPostProps = { user: IronSessionData["user"]; name: string | undefined };

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
        <form action={user ? "/api/posts/submit" : `/login`} method="POST">
          <p className="capitalize text-lg">Posting To: {name}</p>
          <label>
            Post Title
            <input
              disabled={user === null}
              id="title"
              name="title"
              className="textfield"
            />
          </label>
          <label>
            Post Body
            <textarea
              disabled={user === null}
              id="body"
              name="body"
              className="textfield"
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

export const getServerSideProps = withSessionSsr<NewPostProps>(async (ctx) => {
  if (!ctx.params?.name) {
    return { notFound: true };
  }
  return {
    props: { user: ctx.req.session.user, name: ctx.params!.name as string },
  };
});

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default NewPost;
