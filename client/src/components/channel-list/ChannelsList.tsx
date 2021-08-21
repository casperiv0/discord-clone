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
];

export const ChannelsList = () => {
  return (
    <div className={styles.channelsList}>
      {MOCK_CHANNELS.map((channel) => (
        <ChannelItem channel={channel} key={channel.id} />
      ))}
    </div>
  );
};
