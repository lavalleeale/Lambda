import type { GetServerSideProps, NextPage, PageConfig } from "next";
import Head from "next/head";
import { getId, userCookie } from "../../lib/user";

type NewSectionProps = { user: userCookie | null; error: string | null };

const NewSection: NextPage<NewSectionProps> = ({ user, error }) => {
  return (
    <>
      <Head>
        <title>λ | Create Section</title>
      </Head>
      <div className="paper overflow-auto">
        <form action={user ? "/api/d/create" : "/login"} method="POST">
          <label>
            Section Name
            <input
              disabled={user === null}
              id="name"
              name="name"
              className="dark:disabled:bg-slate-800 dark:bg-slate-500 disabled:bg-slate-400 w-full p-1 mb-1 rounded-md"
            />
          </label>
          {error && (
            <strong className="text-red-600">
              {error === "P2002" ? "Section Already Exists" : "Unknown Error"}
            </strong>
          )}
          <button className="btn btn-blue float-right" type="submit">
            {user ? "Create" : "Sign In To Create"}
          </button>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<NewSectionProps> = async (
  ctx
) => {
  return {
    props: {
      user: getId(ctx.req),
      error: ctx.query.error ? (ctx.query.error as string) : null,
    },
  };
};

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default NewSection;
