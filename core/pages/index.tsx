import type { GetServerSideProps, NextPage } from "next";
import useSwr from "swr";
import fetcher from "../utils/fetcher";
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";

interface GetUsers {
  status: number;
  message: string;
}

const Home: NextPage<{ fallbackData: GetUsers }> = ({ fallbackData }) => {
  const { data } = useSwr<GetUsers | null>(
    `http://localhost:1337/api/get-users`,
    fetcher,
    { fallbackData }
  );

  if (data?.status == 200) {
    return <LoginPage />;
  }

  return <RegisterPage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(
    `http://localhost:1337/api/get-users`,
    context.req.headers
  );

  return { props: { fallbackData: data } };
};

export default Home;
