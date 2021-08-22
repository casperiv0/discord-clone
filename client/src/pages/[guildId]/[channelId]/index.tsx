import * as React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { AppLayout } from "components/app-layout/AppLayout";
import { useChannelsStore } from "lib/state/channelsState";
import { Channel as TChannel } from "types/Channel";
import { Message } from "types/Message";
import { useMessagesStore } from "lib/state/messagesState";
import { Guild } from "types/Guild";
import { useGuildStore } from "lib/state/guildsState";
import { verifyAuth } from "lib/actions/auth";
import { useAuthStore } from "lib/state/authState";
import { User } from "types/User";
import { getGuild, getGuilds } from "lib/actions/guild";
import { getChannelById, getChannelsForGuild } from "lib/actions/channel";
import { getMessagesInChannel } from "lib/actions/message";
import { socket } from "lib/socket";

interface Props {
  channel: TChannel | null;
  guild: Guild | null;
  user: User | null;
  channels: TChannel[];
  messages: Message[];
  guilds: Guild[];
}

export default function Channel({ channel, channels, guilds, messages, guild, user }: Props) {
  const setMessages = useMessagesStore((s) => s.setMessages);
  const setChannel = useChannelsStore((s) => s.setCurrentChannel);
  const setChannels = useChannelsStore((s) => s.setChannels);
  const setGuild = useGuildStore((s) => s.setCurrentGuild);
  const setGuilds = useGuildStore((s) => s.setGuilds);
  const setUser = useAuthStore((s) => s.setUser);

  React.useEffect(() => {
    if (guild && channel) {
      socket.emit("JOIN_CHANNEL", { guildId: guild.id, channelId: channel.id });
    }
  }, [guild, channel]);

  React.useEffect(() => {
    setMessages(messages);
  }, [setMessages, messages]);

  React.useEffect(() => {
    if (channel) {
      setChannel(channel);
    }

    setChannels(channels);
  }, [channel, guild, channels, setChannel, setChannels]);

  React.useEffect(() => {
    if (guild) {
      setGuild(guild);
    }

    if (guilds) {
      setGuilds(guilds);
    }
  }, [guild, guilds, setGuild, setGuilds]);

  React.useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);

  return (
    <>
      <Head>
        <title>{channel?.name ?? guild?.name ?? "Discord clone"}</title>
      </Head>
      <AppLayout />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const cookie = req.headers.cookie;
  const { channelId, guildId } = query;

  return {
    props: {
      user: await verifyAuth(cookie),
      channels: await getChannelsForGuild(guildId as string, cookie),
      channel: await getChannelById(channelId as string, cookie),
      messages: await getMessagesInChannel(guildId as string, channelId as string, cookie),
      guild: await getGuild(guildId as string, cookie),
      guilds: await getGuilds(cookie),
    },
  };
};
