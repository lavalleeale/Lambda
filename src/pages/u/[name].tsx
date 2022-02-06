import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PostComponent from "../../components/Post";
import prisma from "../../lib/prisma";

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
  const user = await prisma!.user.findUnique({
    where: { name: ctx.params?.name as string },
    include: {
      posts: { select: { title: true, body: true, id: true, sectionId: true } },
    },
  });

  if (!user) {
    ctx.res.statusCode = 404;
  }

  return {
    props: { user },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default UserPage;
