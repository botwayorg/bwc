import LogoSection from "../components/Logo";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-provider";
import Api from "../client";
import toast, { Toaster } from "react-hot-toast";
import { ErrorMsg } from "../components/Messages/error";
import { FindYourPasswordMsg } from "../components/Messages/find-your-password";

const LOGIN_URL = "/auth";

function Login() {
  const { setAuth }: any = useContext(AuthContext);
  const userRef: any = useRef();
  const errRef: any = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await Api.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      toast.error(<ErrorMsg msg={errMsg} />, {
        style: {
          borderRadius: "10px",
        },
        className: "bg-secondary",
      });

      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
        </section>
      ) : (
        <main className="flex flex-col md:flex-row-reverse md:h-screen">
          <Toaster />
          <LogoSection />

          <section className="justify-center px-4 md:px-0 md:flex md:w-2/3 md:border-r border-gray-800">
            <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
              <h2 className="text-lg font-medium md:text-2xl text-white">
                Sign in
              </h2>
              <a
                onClick={() =>
                  toast(<FindYourPasswordMsg />, {
                    icon: "🔐",
                    style: {
                      borderRadius: "10px",
                    },
                    className: "bg-secondary",
                  })
                }
                className="text-sm pt-1 cursor-pointer"
              >
                How I can find my password?
              </a>
              <div className="my-4">
                <form onSubmit={handleSubmit}>
                  <div className="pt-8">
                    <label
                      htmlFor="username"
                      className="block text-gray-500 text-sm font-semibold"
                    >
                      Username
                    </label>
                    <div className="pt-4">
                      <input
                        className="trsn bg border border-gray-800 placeholder:text-gray-400 text-white sm:text-sm rounded-lg focus:outline-none hover:border-blue-800 block w-full p-2"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        placeholder="User Machine Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="password"
                      className="block text-gray-500 text-sm font-semibold"
                    >
                      Password
                    </label>
                    <div className="pt-4">
                      <input
                        className="trsn bg border border-gray-800 placeholder:text-gray-400 text-white sm:text-sm rounded-lg focus:outline-none hover:border-blue-800 block w-full p-2"
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        placeholder="••••••••••••••••"
                        required
                      />
                    </div>
                  </div>

                  <br />

                  <div className="mt-6 space-y-2 flex justify-center">
                    <button
                      type="submit"
                      style={{ background: "#1163E6" }}
                      className="button button__md button__primary w-full"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default Login;
