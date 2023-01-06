import Link from "next/link";

const Login = () => {
  return (
    <form
      className="paper overflow-auto text-black"
      action="/api/login"
      method="POST"
    >
      <h3 className="text-3xl text-center">Login</h3>
      <label>
        <p>
          Signature
          <Link href="/sigexplanation">
            <a className="">?</a>
          </Link>
        </p>
        <textarea className="block textfield" id="sig" name="sig" />
      </label>
      <button className="btn btn-blue float-right" type="submit">
        Login / Sign up
      </button>
    </form>
  );
};

export default Login;
