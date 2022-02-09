import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <form className="paper overflow-auto" action="/api/signup" method="POST">
      <h3 className="text-3xl text-center">Login</h3>
      <label>
        Signature{" "}
        <Link href="/sigexplanation">
          <a className="">?</a>
        </Link>
        <textarea
          className="block h-24 dark:disabled:bg-slate-800 dark:bg-slate-500 disabled:bg-slate-400 w-full p-1 mb-1 rounded-md"
          id="sig"
          name="sig"
        />
      </label>
      <button className="btn btn-blue float-right" type="submit">
        Login / Sign up
      </button>
    </form>
  );
};

export default Login;
