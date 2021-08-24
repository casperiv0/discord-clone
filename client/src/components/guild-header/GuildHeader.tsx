import * as React from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { ArrowDownIcon } from "icons/ArrowDown";
import { useGuildStore } from "lib/state/guildsState";
import styles from "./guild.module.scss";
import { classes } from "utils/classes";
import { useModalStore } from "lib/state/modalState";
import { Modals } from "types/Modals";
import { CreateCategoryModal } from "components/modals/CreateCategoryModal";
import { CreateChannelModal } from "components/modals/CreateChannelModal";

export const GuildHeader = () => {
  const openModal = useModalStore((s) => s.openModal);
  const [open, setOpen] = React.useState(false);

  const [channelOpen, setChOpen] = React.useState(false);

  const currentGuild = useGuildStore((s) => s.currentGuild);
  const ref = useOnclickOutside(() => setOpen(false));

  function handleOpen(id: number) {
    if (id === Modals.CREATE_CHANNEL) {
      setChOpen(true);
    } else {
      openModal(id);
    }

    setOpen(false);
  }

  return (
    <>
      <button
        ref={ref}
        onClick={() => setOpen((v) => !v)}
        className={classes(styles.guildHeader, open && styles.active)}
      >
        <h1>{currentGuild?.name}</h1>

        <ArrowDownIcon fill="white" />
      </button>

      {open ? (
        <div ref={ref} className={styles.guildDropdown}>
          <button className={styles.dropdownItem}>Server Boost</button>
          <div className={styles.dropdownDivider} />
          <button
            onClick={() => handleOpen(Modals.INVITE)}
            className={classes(styles.dropdownItem, styles.invite)}
          >
            Invite People
          </button>
          <button className={styles.dropdownItem}>Server Settings</button>
          <button className={styles.dropdownItem}>Server Insights</button>
          <button onClick={() => handleOpen(Modals.CREATE_CHANNEL)} className={styles.dropdownItem}>
            Create Channel
          </button>
          <button
            onClick={() => handleOpen(Modals.CREATE_CATEGORY)}
            className={styles.dropdownItem}
          >
            Create Category
          </button>
        </div>
      ) : null}

      <CreateChannelModal parentId={null} isOpen={channelOpen} onClose={() => setChOpen(false)} />
      <CreateCategoryModal />
    </>
  );
};
