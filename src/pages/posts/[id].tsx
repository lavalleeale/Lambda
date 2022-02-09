import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PostComponent from "../../components/Post";
import prisma from "../../lib/prisma";
import { getId, userCookie } from "../../lib/user";
import Comment from "../../components/Comment";

type PostPageProps = {
  post: PublicPostData & {
    comments: {
      id: string;
      body: string;
      author: {
        name: string;
      };
      upsNum: number;
      downsNum: number;
      ups: {}[];
      downs: {}[];
    }[];
  };
  user: userCookie | null;
};

const PostPage: NextPage<PostPageProps> = ({ post, user }) => {
  return (
    <>
      <Head>
        <title>λ | {post.title}</title>
      </Head>
      <PostComponent post={post} showFull />
      <form
        className="paper overflow-auto"
        action={user ? `/api/posts/${post.id}/comment` : "/login"}
        method="POST"
      >
        <input type="hidden" id="postId" name="postId" value={post.id}></input>
        <label>
          Comment
          <input
            disabled={!user}
            id="body"
            name="body"
            className="dark:disabled:bg-slate-800 dark:bg-slate-500 disabled:bg-slate-400 w-full p-1 mb-1 rounded-md"
          />
        </label>
        <button className="btn btn-blue float-right" type="submit">
          {user ? "Submit" : "Sign In To Submit"}
        </button>
      </form>
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  ctx
) => {
  const id = getId(ctx.req)?.id ?? "";
  const post = await prisma!.post.findUnique({
    where: { id: ctx.params?.id as string },
    select: {
      author: { select: { name: true } },
      id: true,
      title: true,
      body: true,
      sectionId: true,
      upsNum: true,
      downsNum: true,
      ups: { where: { id: id }, select: { name: true } },
      downs: { where: { id: id }, select: { name: true } },
      comments: {
        select: {
          id: true,
          body: true,
          upsNum: true,
          downsNum: true,
          author: { select: { name: true } },
          ups: { where: { id: id }, select: { name: true } },
          downs: { where: { id: id }, select: { name: true } },
        },
      },
    },
  });
  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post, user: getId(ctx.req) },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default PostPage;
