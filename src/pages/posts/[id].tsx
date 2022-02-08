import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PostComponent from "../../components/Post";
import prisma from "../../lib/prisma";
import { getId } from "../../lib/user";

type PostPageProps = {
  post: PublicPostData | null;
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>λ | {post?.title ?? "Unknown"}</title>
      </Head>
      <div className="paper overflow-auto">
        {post ? <PostComponent post={post} showFull /> : "Post Not Found"}
      </div>
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
    },
  });
  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default PostPage;
