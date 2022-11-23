import type { GetServerSideProps, NextPage } from "next";
import useSwr from "swr";
import fetcher from "../utils/fetcher";

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const { data } = useSwr<User | null>(
    `http://localhost:1337/api/me`,
    fetcher,
    { fallbackData }
  );

  if (data) {
    return <div>Welcome! {data.name}</div>;
  }

  return <div>Please login</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(
    `http://localhost:1337/api/me`,
    context.req.headers
  );

  return { props: { fallbackData: data } };
};

export default Home;
