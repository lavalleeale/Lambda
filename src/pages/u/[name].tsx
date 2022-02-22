import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PostComponent from "../../components/Post";
import prisma from "../../lib/prisma";
import { getId } from "../../lib/user";

type UserPageProps = {
  user: {
    name: string;
    key: string;
    posts: PublicPostData[];
  } | null;
};

const UserPage: NextPage<UserPageProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>λ | {user?.name ?? "Unknown"}</title>
      </Head>
      {user ? (
        <>
          <div className="paper">
            <p>Name: {user.name}</p>
            <p>PGP Key ID: {user.key}</p>
          </div>
          {user.posts.map((post) => (
            <PostComponent key={post.id} post={post} />
          ))}
        </>
      ) : (
        <div className="paper">User Not Found</div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (
  ctx
) => {
  const id = getId(ctx.req)?.id ?? "";
  const user = await prisma!.user.findUnique({
    where: { name: ctx.params?.name as string },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
        select: {
          title: true,
          body: true,
          id: true,
          sectionId: true,
          upsNum: true,
          downsNum: true,
          ups: { where: { id: id }, select: { name: true } },
          downs: { where: { id: id }, select: { name: true } },
          author: { select: { name: true } },
        },
      },
    },
  });

  if (!user) {
    return { notFound: true };
  }

  return {
    props: { user },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default UserPage;
