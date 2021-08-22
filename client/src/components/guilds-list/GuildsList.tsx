import * as React from "react";
import { useGuildStore } from "lib/state/guildsState";
import { GuildItem } from "./GuildItem";
import styles from "./guilds.module.scss";
import { PlusIcon } from "icons/Plus";
import { classes } from "utils/classes";
import { useModalStore } from "lib/state/modalState";
import { Modals } from "types/Modals";

const DM_GUILD: any = {
  name: "HOME",
  icon: null,
  id: "@me",
};

export const GuildsList = () => {
  const guilds = useGuildStore((s) => s.guilds);

  return (
    <div className={styles.guildsList}>
      <GuildItem guild={DM_GUILD} />

      <div className={styles.dmDivider} />

      {guilds.map((guild) => (
        <GuildItem key={guild.id} guild={guild} />
      ))}

      <AddGuild />
    </div>
  );
};

const AddGuild = () => {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <button
      onClick={() => openModal(Modals.CREATE_GUILD)}
      className={classes(styles.guildItem, styles.addGuild)}
    >
      <PlusIcon fill="#42A562" />
    </button>
  );
};
