import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import prisma from "../../../lib/prisma";
import { getId } from "../../../lib/user";

type CrossPageProps = {
  post: {
    author: { name: string };
    title: string;
    sectionId: string;
    id: string;
  };
  error: string | undefined;
};

const PostPage: NextPage<CrossPageProps> = ({ post, error }) => {
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
        <form action={`/api/posts/${post.id}/cross`} method="POST">
          <input className="textfield" placeholder="Destination" name="dest" />
          <button className="btn btn-blue float-right">Submit</button>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CrossPageProps> = async (
  ctx
) => {
  const id = getId(ctx.req)?.id ?? "";
  const commentSelect = {
    depth: true,
    postId: true,
    id: true,
    body: true,
    upsNum: true,
    downsNum: true,
    author: { select: { name: true } },
    ups: { where: { id: id }, select: { name: true } },
    downs: { where: { id: id }, select: { name: true } },
  };
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
    props: { post, error: ctx.query.error as string | undefined },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default PostPage;
