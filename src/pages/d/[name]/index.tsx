import { Section } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import PostComponent from "../../../components/Post";
import prisma from "../../../lib/prisma";
import { getId } from "../../../lib/user";

type SectionPageProps = {
  section:
    | (Section & {
        posts: PublicPostData[];
      })
    | null;
  page: number;
};

const SectionPage: NextPage<SectionPageProps> = ({ section, page }) => {
  return (
    <>
      <Head>
        <title>λ | {section?.name ?? "Unkown"}</title>
      </Head>
      {section ? (
        <div className="flex">
          <div className="w-3/4">
            <div className="paper">
              <p className="text-3xl capitalize">{section.name} </p>
            </div>
            <div>
              {section.posts.map((post) => (
                <PostComponent key={post.id} post={post} hideFrom />
              ))}
              <div className="paper justify-between flex items-center">
                {page > 0 ? (
                  <Link href={`/d/${section.name}?page=${page - 1}`}>
                    <a className="btn btn-blue">{"<"}</a>
                  </Link>
                ) : (
                  <div></div>
                )}
                <p className="inline">Page {page + 1}</p>
                {section.posts.length === 10 ? (
                  <Link href={`/d/${section.name}?page=${page + 1}`}>
                    <a className="btn btn-blue">{">"}</a>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div className="paper overflow-auto w-1/4">
            <form action={`/d/${section.name}/submit`} method="POST">
              <button className="btn-pill btn-white w-full">Create Post</button>
            </form>
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
  const id = getId(ctx.req)?.id ?? "";
  const page = ctx.query.page ? parseInt(ctx.query.page as string, 10) : 0;
  const section = await prisma!.section.findUnique({
    where: { name: ctx.params?.name as string },
    include: {
      posts: {
        take: 10,
        skip: page * 10,
        orderBy: { score: "desc" },
        select: {
          id: true,
          title: true,
          body: true,
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

  if (!section) {
    return { notFound: true };
  }
  return {
    props: { section, page },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default SectionPage;
