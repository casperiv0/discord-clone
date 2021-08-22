import { ArrowDownIcon } from "icons/ArrowDown";
import { useGuildStore } from "lib/state/guildsState";
import styles from "./guild.module.scss";

export const GuildHeader = () => {
  const currentGuild = useGuildStore((s) => s.currentGuild);

  return (
    <button className={styles.guildHeader}>
      <h1>{currentGuild?.name}</h1>

      <ArrowDownIcon fill="white" />
    </button>
  );
};
