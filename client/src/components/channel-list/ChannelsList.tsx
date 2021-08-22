import { GuildHeader } from "components/guild-header/GuildHeader";
import { useChannelsStore } from "lib/state/channelsState";
import * as React from "react";
import { Channel } from "types/Channel";
import { ChannelItem } from "./ChannelItem";
import styles from "./channels.module.scss";

export const MOCK_CHANNELS: Channel[] = [
  {
    id: "1",
    name: "General",
    type: "GUILD_CATEGORY",
    parentId: null,
    guildId: "1",
    topic: null,
  },
  {
    id: "2",
    name: "general",
    parentId: "1",
    type: "GUILD_TEXT",
    guildId: "1",
    topic: "Hello world",
  },
  {
    id: "3",
    name: "development",
    parentId: "1",
    type: "GUILD_TEXT",
    guildId: "1",
    topic: null,
  },
  {
    id: "4",
    name: "Testing",
    type: "GUILD_CATEGORY",
    parentId: null,
    guildId: "1",
    topic: null,
  },
  {
    id: "5",
    name: "this-is-a-super-long-channel-name",
    type: "GUILD_TEXT",
    parentId: null,
    guildId: "1",
    topic: null,
  },
];

export const ChannelsList = () => {
  const channels = useChannelsStore((s) => s.channels);
  const setChannels = useChannelsStore((s) => s.setChannels);

  React.useEffect(() => {
    setChannels(MOCK_CHANNELS);
  }, [setChannels]);

  return (
    <div className={styles.channelsList}>
      <GuildHeader />
      {channels.map((channel) => (
        <ChannelItem channel={channel} key={channel.id} />
      ))}
    </div>
  );
};
