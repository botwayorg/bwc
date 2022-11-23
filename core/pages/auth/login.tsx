import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { ErrorMsg } from "../../components/Messages/error";
import toast, { Toaster } from "react-hot-toast";
import LogoSection from "../../components/Logo";

const createSessionSchema = object({
  email: string().nonempty({
    message: "Email is required",
  }),
  password: string().nonempty({
    message: "Password is required",
  }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError]: any = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  async function onSubmit(values: CreateSessionInput) {
    try {
      await axios.post(`http://localhost:1337/api/sessions`, values, {
        withCredentials: true,
      });

      router.push("/dashboard");
    } catch (e: any) {
      setLoginError(e.message);

      toast.error(<ErrorMsg msg={e.message} />, {
        style: {
          borderRadius: "10px",
        },
        className: "bg-secondary",
      });
    }
  }

  console.log({ errors });

  return (
    <>
      <main className="flex flex-col md:flex-row-reverse md:h-screen">
        <Toaster />
        <LogoSection />
        {loginError != null ?? toast(loginError)}

        <section className="justify-center px-4 md:px-0 md:flex md:w-2/3 md:border-r border-gray-800">
          <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
            <h2 className="text-lg font-medium md:text-2xl text-white">
              Sign in
            </h2>

            <div className="my-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pt-8">
                  <label
                    htmlFor="email"
                    className="block text-gray-500 text-sm font-semibold"
                  >
                    Email
                  </label>
                  <div className="pt-2">
                    <input
                      className="trsn bg border border-gray-800 placeholder:text-gray-400 text-white sm:text-sm rounded-lg focus:outline-none hover:border-blue-800 block w-full p-2"
                      id="email"
                      type="email"
                      placeholder="user@website.com"
                      {...register("email")}
                    />
                    {errors.email?.message != null ??
                      toast(errors.email?.message || "Error")}
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-500 text-sm font-semibold"
                  >
                    Password
                  </label>
                  <div className="pt-2">
                    <input
                      className="trsn bg border border-gray-800 placeholder:text-gray-400 text-white sm:text-sm rounded-lg focus:outline-none hover:border-blue-800 block w-full p-2"
                      id="password"
                      type="password"
                      placeholder="••••••••••••••••"
                      {...register("password")}
                    />
                    {errors.password?.message != null ??
                      toast(errors.password?.message || "Error")}
                  </div>
                </div>

                <div className="mt-6 space-y-2 flex justify-center">
                  <button
                    type="submit"
                    className="button button__md button__primary w-full p-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LoginPage;
