import { Post } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PostComponent from "../components/Post";
import prisma from "../lib/prisma";

const Home: NextPage<{ posts: Post[] }> = (props) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await prisma!.post.findMany({
    take: 10,
    select: { title: true, body: true, id: true, sectionId: true },
  });
  return {
    props: { posts },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default Home;
