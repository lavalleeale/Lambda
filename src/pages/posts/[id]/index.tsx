import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Comment, { commentType } from "../../../components/Comment";
import PostComponent from "../../../components/Post";
import prisma from "../../../lib/prisma";
import { getId, userCookie } from "../../../lib/user";

type PostPageProps = {
  post: PublicPostData & {
    comments: commentType[];
    section: { moderators: {}[] };
  };
  user: userCookie | null;
};

const PostPage: NextPage<PostPageProps> = ({ post, user }) => {
  return (
    <>
      <Head>
        <title>λ | {post.title}</title>
      </Head>
      <PostComponent post={post} showFull currentUser={user?.name || null} />
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} user={user !== null} />
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  ctx
) => {
  const id = getId(ctx.req)?.id;
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
      body: true,
      sectionId: true,
      upsNum: true,
      downsNum: true,
      ups: { where: { id: id }, select: { name: true } },
      downs: { where: { id: id }, select: { name: true } },
      section: {
        select: { moderators: { where: { id }, select: { id: true } } },
      },
      comments: {
        where: { parentId: null },
        select: {
          ...commentSelect,
          children: {
            select: {
              ...commentSelect,
              children: {
                select: {
                  ...commentSelect,
                  children: {
                    select: {
                      ...commentSelect,
                      children: { select: commentSelect },
                    },
                  },
                },
              },
            },
          },
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
