import * as React from "react";
import { Guild } from "types/Guild";
import { GuildItem } from "./GuildItem";
import styles from "./guilds.module.scss";

export const MOCK_GUILDS: Guild[] = [
  {
    id: "1",
    name: "Hello",
    channel_ids: [],
    member_ids: [],
    icon: "https://avatars.githubusercontent.com/u/53900565?v=4",
  },
  {
    id: "2",
    name: "Second guild",
    channel_ids: [],
    member_ids: [],
    icon: null,
  },
  {
    id: "3",
    name: "Third guild",
    channel_ids: [],
    member_ids: [],
    icon: null,
  },
];

const DM_GUILD: Guild = {
  name: "HOME",
  icon: null,
  id: "@me",
  channel_ids: [],
  member_ids: [],
};

export const GuildsList = () => {
  return (
    <div className={styles.guildsList}>
      <GuildItem guild={DM_GUILD} />

      <div className={styles.dmDivider} />

      {MOCK_GUILDS.map((guild) => (
        <GuildItem key={guild.id} guild={guild} />
      ))}
    </div>
  );
};
