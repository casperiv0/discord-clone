import * as React from "react";
import { useRouter } from "next/router";
import { AppLayout } from "components/app-layout/AppLayout";
import { verifyAuth } from "lib/actions/auth";
import { getGuilds } from "lib/actions/guild";
import { useAuthStore } from "lib/state/authState";
import { useGuildStore } from "lib/state/guildsState";
import { GetServerSideProps } from "next";
import { Guild } from "types/Guild";
import { User } from "types/User";

interface Props {
  guilds: Guild[];
  user: User | null;
}

export default function Index({ user, guilds }: Props) {
  const setUser = useAuthStore((s) => s.setUser);
  const setGuilds = useGuildStore((s) => s.setGuilds);
  const router = useRouter();

  React.useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  React.useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  React.useEffect(() => {
    setGuilds(guilds);
  }, [guilds, setGuilds]);

  return <AppLayout />;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const cookie = req.headers.cookie;

  return {
    props: {
      user: await verifyAuth(cookie),
      guilds: await getGuilds(cookie),
    },
  };
};
