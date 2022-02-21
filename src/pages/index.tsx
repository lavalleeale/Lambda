import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import PostComponent from "../components/Post";
import prisma from "../lib/prisma";
import { getId } from "../lib/user";

type HomePageProps = {
  posts: (PublicPostData & { author: { name: string } })[];
  page: number;
};

const Home: NextPage<HomePageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Lambda</title>
      </Head>
      <div className="flex">
        <div className="w-3/4 inline-block">
          {props.posts.length !== 0 ? (
            <div>
              {props.posts.map((post) => (
                <PostComponent key={post.id} post={post} />
              ))}
              <div className="paper justify-between flex items-center">
                {props.page > 0 ? (
                  <Link href={`/home?page=${props.page - 1}`}>
                    <a className="btn btn-blue">{"<"}</a>
                  </Link>
                ) : (
                  <div></div>
                )}
                <p className="inline">Page {props.page + 1}</p>
                {props.posts.length === 10 ? (
                  <Link href={`/home?page=${props.page + 1}`}>
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
          <form action="/d/create" method="POST">
            <button className="btn-pill btn-white w-full">
              Create Section
            </button>
          </form>
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
  const posts = await prisma!.post.findMany({
    take: 10,
    skip: page * 10,
    orderBy: { score: "desc" },
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
  return {
    props: { posts, page },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default Home;
