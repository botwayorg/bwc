import type { GetServerSideProps, NextPage } from "next";
import useSwr from "swr";
import fetcher from "../../utils/fetcher";
import { useEffect } from "react";
import Router from "next/router";
import { User } from "./interface";
import AppLayout from "./dash";

const Dashboard: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const { data } = useSwr<User | null>(
    `http://localhost:1337/api/me`,
    fetcher,
    { fallbackData }
  );

  useEffect(() => {
    if (!data) {
      Router.push("/auth/login");
    }
  });

  if (data) {
    return (
      <AppLayout>
        <h1>Welcome to the PlanetScale Next.js Starter App!</h1>
        <p>
          This is an example site to demonstrate how to use{" "}
          <a href={`https://next-auth.js.org`}>NextAuth.js</a> for
          authentication with PlanetScale and Prisma.
        </p>
        <blockquote>
          <p>
            You can find how to get started{" "}
            <a
              href={`https://github.com/planetscale/nextjs-planetscale-starter`}
            >
              here
            </a>
            .
          </p>
        </blockquote>
      </AppLayout>
    );
  }

  return <h1>Loading</h1>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(
    `http://localhost:1337/api/me`,
    context.req.headers
  );

  return { props: { fallbackData: data } };
};

export default Dashboard;
