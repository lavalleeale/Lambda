import { Section } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Posts from "../../../components/Posts";
import SectionSidebar from "../../../components/SectionSidebar";
import prisma from "../../../lib/prisma";
import { getId } from "../../../lib/user";

type SectionPageProps = {
  section:
    | (Section & {
        posts: (PublicPostData & {
          section: {
            moderators: {}[];
          };
        })[];
        moderators: { name: string }[];
      })
    | null;
  page: number;
  sort: string;
  currentUser: string | null;
};

const SectionPage: NextPage<SectionPageProps> = ({
  section,
  page,
  sort,
  currentUser,
}) => {
  return (
    <>
      <Head>
        <title>λ | {section?.name ?? "Unkown"}</title>
      </Head>
      {section ? (
        <div className="flex">
          <Posts
            posts={section.posts}
            sort={sort}
            page={page}
            name={section.name}
            path={`/d/${section.name}`}
            currentUser={currentUser}
          />
          <SectionSidebar name={section.name} mods={section.moderators} />
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
  const id = getId(ctx.req)?.id;
  const page = ctx.query.page ? parseInt(ctx.query.page as string, 10) : 0;
  const sort: { [key: string]: "desc" | "asc" } =
    ctx.query.sort === "new"
      ? { createdAt: "desc" }
      : ctx.query.sort === "old"
      ? { createdAt: "asc" }
      : ctx.query.sort === "top"
      ? { upsNum: "desc" }
      : { score: "desc" };
  const section = await prisma!.section.findUnique({
    where: { name: ctx.params?.name as string },
    include: {
      moderators: true,
      posts: {
        take: 10,
        skip: page * 10,
        orderBy: sort,
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
          section: {
            select: { moderators: { where: { id: id }, select: { id: true } } },
          },
        },
      },
    },
  });

  if (!section) {
    return { notFound: true };
  }
  return {
    props: {
      section,
      page,
      sort: (ctx.query.sort as string) ?? "best",
      currentUser: id || null,
    },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default SectionPage;
