import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import PostComponent from "../components/Post";
import SectionLink from "../components/SectionLink";
import SortSelector from "../components/SortSelector";
import prisma from "../lib/prisma";
import { getId } from "../lib/user";

type HomePageProps = {
  posts: (PublicPostData & { author: { name: string } })[];
  page: number;
  sort: string;
  topSections: { name: string; _count: { posts: number } }[];
};

const Home: NextPage<HomePageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Lambda</title>
      </Head>
      <div className="flex">
        <div className="w-3/4 inline-block">
          <SortSelector sort={props.sort} page={props.page} path="/home" />
          {props.posts.length !== 0 ? (
            <div>
              {props.posts.map((post) => (
                <PostComponent key={post.id} post={post} />
              ))}
              <div className="paper justify-between flex items-center">
                {props.page > 0 ? (
                  <Link
                    href={{
                      pathname: "/home",
                      query: { page: props.page - 1 },
                    }}
                  >
                    <a className="btn btn-blue">{"<"}</a>
                  </Link>
                ) : (
                  <div></div>
                )}
                <p className="inline">Page {props.page + 1}</p>
                {props.posts.length === 10 ? (
                  <Link
                    href={{
                      pathname: "/home",
                      query: { page: props.page + 1 },
                    }}
                  >
                    <a className="btn btn-blue">{">"}</a>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ) : (
            <div className="paper">
              <p>No Posts Found :(</p>
            </div>
          )}
        </div>
        <div className="paper w-1/4 inline-block">
          <Link href="/d/create">
            <a className="btn-pill btn-white w-full block text-center">
              Create Section
            </a>
          </Link>
          <p className="mt-1">Top Sections:</p>
          {props.topSections.map((section) => (
            <div key={section.name}>
              <SectionLink section={section.name} hideLabel />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  ctx
) => {
  const id = getId(ctx.req)?.id ?? "";
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
      ups: { where: { id: id }, select: { name: true } },
      downs: { where: { id: id }, select: { name: true } },
      author: { select: { name: true } },
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
    },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default Home;
