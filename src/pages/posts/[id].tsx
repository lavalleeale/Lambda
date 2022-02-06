import { Post } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import prisma from "../../lib/prisma";

type PostPageProps = {
  title: string | undefined;
  body: string | null | undefined;
  author: string | undefined;
};

const PostPage: NextPage<PostPageProps> = ({ title, body, author }) => {
  return (
    <>
      <Head>
        <title>λ | {title ?? "Unknown"}</title>
      </Head>
      <div className="paper overflow-auto">
        {title ? (
          <>
            <h3 className="text-3xl">{title}</h3>
            <p>{body}</p>
            <Link href={`/u/${author}`}>
              <a className="text-gray-500 float-right">u/{author}</a>
            </Link>
          </>
        ) : (
          "Post Not Found"
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  ctx
) => {
  const post = await prisma!.post.findUnique({
    where: { id: ctx.params?.id as string },
    include: {
      author: { select: { name: true } },
    },
  });
  if (!post) {
    ctx.res.statusCode = 404;
  }

  return {
    props: { title: post?.title, body: post?.body, author: post?.author.name },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default PostPage;
