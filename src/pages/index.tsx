import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import IndexSidebar from "../components/IndexSidebar";
import Posts from "../components/Posts";
import prisma from "../lib/prisma";
import { getId } from "../lib/user";

type HomePageProps = {
  posts: (PublicPostData & {
    section: { moderators: {}[] };
  })[];
  page: number;
  sort: string;
  topSections: { name: string; _count: { posts: number } }[];
  currentUser: string | null;
};

const Home: NextPage<HomePageProps> = ({
  sort,
  page,
  posts,
  topSections,
  currentUser,
}) => {
  return (
    <>
      <Head>
        <title>Lambda</title>
      </Head>
      <div className="flex">
        <Posts
          posts={posts}
          sort={sort}
          page={page}
          path="/home"
          currentUser={currentUser}
        />
        <IndexSidebar topSections={topSections} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  ctx
) => {
  const user = getId(ctx.req);
  const page = ctx.query.page ? parseInt(ctx.query.page as string, 10) : 0;
  const sort: { [key: string]: "desc" | "asc" } =
    ctx.query.sort === "new"
      ? { createdAt: "desc" }
      : ctx.query.sort === "old"
      ? { createdAt: "asc" }
      : ctx.query.sort === "top"
      ? { upsNum: "desc" }
      : { score: "desc" };

  const posts = await prisma!.post.findMany({
    take: 10,
    skip: page * 10,
    orderBy: sort,
    select: {
      title: true,
      body: true,
      id: true,
      sectionId: true,
      upsNum: true,
      downsNum: true,
      ups: { where: { id: user?.id }, select: { name: true } },
      downs: { where: { id: user?.id }, select: { name: true } },
      author: { select: { name: true } },
      section: {
        select: {
          moderators: { where: { id: user?.id ?? "" }, select: { id: true } },
        },
      },
    },
  });

  const topSecions = await prisma!.section.findMany({
    take: 5,
    orderBy: { posts: { _count: "desc" } },
    select: { _count: { select: { posts: true } }, name: true },
  });

  return {
    props: {
      posts,
      page,
      sort: (ctx.query.sort as string) ?? "best",
      topSections: topSecions,
      currentUser: user?.name || null,
    },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default Home;
