import { Post, Section } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PostComponent from "../../../components/Post";
import prisma from "../../../lib/prisma";

type SectionPageProps = {
  section:
    | (Section & {
        posts: PublicPostData[];
      })
    | null;
};

const SectionPage: NextPage<SectionPageProps> = ({ section }) => {
  return (
    <>
      <Head>
        <title>λ | {section?.name ?? "Unkown"}</title>
      </Head>
      {section ? (
        <div className="flex">
          <div className="paper w-3/4">
            <p className="text-3xl capitalize">{section.name} </p>
          </div>
          <div className="paper overflow-auto w-1/4">
            <form action={`/d/${section.name}/submit`} method="POST">
              <button className="btn-pill btn-white w-full">Create Post</button>
            </form>
          </div>
          <div>
            {section.posts.map((post) => (
              <PostComponent key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="paper">Section Not Found</div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SectionPageProps> = async (
  ctx
) => {
  const section = await prisma!.section.findUnique({
    where: { name: ctx.params?.name as string },
    include: {
      posts: { select: { id: true, title: true, body: true, sectionId: true } },
    },
  });
  if (!section) {
    ctx.res.statusCode = 404;
  }
  return {
    props: { section },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default SectionPage;
