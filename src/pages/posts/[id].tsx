import { Post } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import PostComponent from "../../components/Post";
import prisma from "../../lib/prisma";

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
  const post = await prisma!.post.findUnique({
    where: { id: ctx.params?.id as string },
    select: {
      author: { select: { name: true } },
      id: true,
      title: true,
      body: true,
      sectionId: true,
    },
  });
  if (!post) {
    ctx.res.statusCode = 404;
  }

  return {
    props: { post },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default PostPage;
