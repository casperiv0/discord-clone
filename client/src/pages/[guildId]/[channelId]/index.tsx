import * as React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { AppLayout } from "components/app-layout/AppLayout";
import { MOCK_CHANNELS } from "components/channel-list/ChannelsList";
import { useChannelsStore } from "lib/state/channelsState";
import { Channel as TChannel } from "types/Channel";
import { MOCK_MESSAGES } from "components/messages-list/MessagesList";
import { Message } from "types/Message";
import { useMessagesStore } from "lib/state/messagesState";
import { MOCK_GUILDS } from "components/guilds-list/GuildsList";
import { Guild } from "types/Guild";
import { useGuildStore } from "lib/state/guildsState";

interface Props {
  channel: TChannel | null;
  guild: Guild | null;
  channels: TChannel[];
  messages: Message[];
}

export default function Channel({ channel, channels, messages, guild }: Props) {
  const setMessages = useMessagesStore((s) => s.setMessages);
  const setChannel = useChannelsStore((s) => s.setCurrentChannel);
  const setChannels = useChannelsStore((s) => s.setChannels);
  const setGuild = useGuildStore((s) => s.setCurrentGuild);

  React.useEffect(() => {
    setMessages(messages);
  }, [setMessages, messages]);

  React.useEffect(() => {
    if (channel) {
      setChannel(channel);
    }

    setChannels(channels);
  }, [channel, channels, setChannel, setChannels]);

  React.useEffect(() => {
    if (guild) {
      setGuild(guild);
    }
  }, [guild, setGuild]);

  return (
    <>
      <Head>
        <title>{channel?.name ?? guild?.name ?? "Discord clone"}</title>
      </Head>
      <AppLayout />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { channelId, guildId } = query;

  const channels = MOCK_CHANNELS.filter((v) => v.guildId === guildId);
  const channel = MOCK_CHANNELS.find((v) => v.id === channelId && v.guildId === guildId) ?? null;
  const messages = MOCK_MESSAGES.filter((v) => v.channelId === channelId && v.guildId === guildId);
  const guild = MOCK_GUILDS.find((v) => v.id === guildId) ?? null;

  return {
    props: {
      channels,
      channel,
      messages,
      guild,
    },
  };
};
