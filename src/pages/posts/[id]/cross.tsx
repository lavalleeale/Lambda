import { IronSessionData } from "iron-session";
import type { NextPage } from "next";
import Head from "next/head";
import prisma from "../../../lib/prisma";
import { withSessionSsr } from "../../../lib/user";

type CrossPageProps = {
  post: {
    author: { name: string };
    title: string;
    sectionId: string;
    id: string;
  };
  error: string | null;
  user: IronSessionData["user"] | null;
};

const PostPage: NextPage<CrossPageProps> = ({ post, error, user }) => {
  return (
    <>
      <Head>
        <title>λ | {post.title}</title>
      </Head>
      <div className="paper overflow-auto">
        <h3 className="text-2xl">
          Crossposting {post.title} from d/{post.sectionId}
        </h3>
        {error && (
          <strong className="text-red-600">Section does not exist</strong>
        )}
        <form
          action={user ? `/api/posts/${post.id}/cross` : `/login`}
          method="POST"
        >
          <input
            className="textfield"
            placeholder="Destination"
            name="dest"
            disabled={!user}
          />
          <button className="btn btn-blue float-right">
            {user ? "Submit" : "Sign In To Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps = withSessionSsr<CrossPageProps>(
  async (ctx) => {
    const user = ctx.req.session.user;
    const post = await prisma!.post.findUnique({
      where: { id: ctx.params?.id as string },
      select: {
        author: { select: { name: true } },
        id: true,
        title: true,
        sectionId: true,
      },
    });
    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        post,
        error: (ctx.query.error as string | undefined) || null,
        user: user || null,
      },
    };
  }
);

export const config = {
  unstable_runtimeJS: false,
};

export default PostPage;
