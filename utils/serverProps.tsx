import { GetServerSideProps } from "next";
import { getProviders, getSession } from "next-auth/react";
import { FollowWidget, TrendingWidget } from "../models/widgets";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trendingResults: TrendingWidget[] = await fetch(
    "https://jsonkeeper.com/b/NKEV"
  ).then((res) => res.json());
  const followResults: FollowWidget[] = await fetch(
    "https://jsonkeeper.com/b/WWMJ"
  ).then((res) => res.json());
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
};
