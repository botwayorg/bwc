import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { ErrorMsg } from "../../components/Messages/error";
import LogoSection from "../../components/Logo";

const createUserSchema = object({
  name: string().nonempty({
    message: "Name is required",
  }),
  password: string()
    .min(6, "Password too short - should be 6 chars minimum")
    .nonempty({
      message: "Password is required",
    }),
  passwordConfirmation: string().nonempty({
    message: "passwordConfirmation is required",
  }),
  email: string({
    required_error: "Email is required",
  })
    .email("Not a valid email")
    .nonempty({
      message: "Password is required",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
  const router = useRouter();
  const [registerError, setRegisterError]: any = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(values: CreateUserInput) {
    try {
      await axios.post(`http://localhost:1337/api/users`, values);

      router.push("/auth/login");
    } catch (e: any) {
      setRegisterError(e.message);

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
        {registerError != null ?? toast(registerError)}

        <section className="justify-center px-4 md:px-0 md:flex md:w-2/3 md:border-r border-gray-800">
          <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
            <h2 className="text-lg font-medium md:text-2xl text-white">
              Create Admin User
            </h2>

            <div className="my-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pt-8">
                  <label
                    htmlFor="name"
                    className="block text-gray-500 text-sm font-semibold"
                  >
                    Name
                  </label>
                  <div className="pt-2">
                    <input
                      className="trsn bg border border-gray-800 placeholder:text-gray-400 text-white sm:text-sm rounded-lg focus:outline-none hover:border-blue-800 block w-full p-2"
                      id="name"
                      type="text"
                      placeholder="User"
                      {...register("name")}
                    />
                    {errors.name?.message != null ??
                      toast(errors.name?.message || "Error")}
                  </div>
                </div>

                <div className="mt-6">
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

                <div className="mt-6">
                  <label
                    htmlFor="passwordConfirmation"
                    className="block text-gray-500 text-sm font-semibold"
                  >
                    Password Confirmation
                  </label>
                  <div className="pt-2">
                    <input
                      className="trsn bg border border-gray-800 placeholder:text-gray-400 text-white sm:text-sm rounded-lg focus:outline-none hover:border-blue-800 block w-full p-2"
                      id="passwordConfirmation"
                      type="password"
                      placeholder="••••••••••••••••"
                      {...register("passwordConfirmation")}
                    />
                    {errors.passwordConfirmation?.message != null ??
                      toast(errors.passwordConfirmation?.message || "Error")}
                  </div>
                </div>

                <div className="mt-6 space-y-2 flex justify-center">
                  <button
                    type="submit"
                    className="button button__md button__primary w-full p-2"
                  >
                    Create new Botway Account
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

export default RegisterPage;
