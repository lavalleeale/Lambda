import type { NextPage } from "next";
import Head from "next/head";
import PostComponent from "../../components/Post";
import prisma from "../../lib/prisma";
import { withSessionSsr } from "../../lib/user";

type UserPageProps = {
  user: {
    name: string;
    key: string;
    posts: (PublicPostData & {
      section: {
        moderators: {}[];
      };
    })[];
  } | null;
  currentUser: string | null;
};

const UserPage: NextPage<UserPageProps> = ({ user, currentUser }) => {
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
            <PostComponent
              key={post.id}
              post={post}
              currentUser={currentUser}
            />
          ))}
        </>
      ) : (
        <div className="paper">User Not Found</div>
      )}
    </>
  );
};

export const getServerSideProps = withSessionSsr<UserPageProps>(async (ctx) => {
  const currentUser = ctx.req.session.user;
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
          section: {
            select: {
              moderators: {
                where: { id: currentUser?.id ?? "" },
                select: { id: true },
              },
            },
          },
          ups: { where: { id: currentUser?.id ?? "" }, select: { name: true } },
          downs: {
            where: { id: currentUser?.id ?? "" },
            select: { name: true },
          },
          author: { select: { name: true } },
        },
      },
    },
  });

  if (!user) {
    return { notFound: true };
  }

  return {
    props: { user, currentUser: currentUser?.name ?? null },
  };
});

export const config = {
  unstable_runtimeJS: false,
};

export default UserPage;
