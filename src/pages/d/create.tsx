import { IronSessionData } from "iron-session";
import type { NextPage, PageConfig } from "next";
import Head from "next/head";
import { withSessionSsr } from "../../lib/user";

type NewSectionProps = { user: IronSessionData["user"]; error: string | null };

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
              className="textfield"
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

export const getServerSideProps = withSessionSsr<NewSectionProps>(
  async (ctx) => {
    return {
      props: {
        user: ctx.req.session.user,
        error: ctx.query.error ? (ctx.query.error as string) : null,
      },
    };
  }
);

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default NewSection;
