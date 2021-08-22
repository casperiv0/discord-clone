import * as React from "react";
import Modal from "react-modal";
import { createModalStyles } from "utils/createModalStyles";
import styles from "styles/form.module.scss";
import { useChannelsStore } from "lib/state/channelsState";
import { Channel } from "types/Channel";
import { useGuildStore } from "lib/state/guildsState";
import { useModalStore } from "lib/state/modalState";
import { Modals } from "types/Modals";

export const CreateCategoryModal = () => {
  const { isOpen, closeModal } = useModalStore();

  const [name, setName] = React.useState("");
  const channelStore = useChannelsStore();
  const currentGuild = useGuildStore((s) => s.currentGuild);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentGuild) return;

    const channel: Channel = {
      guildId: currentGuild.id,
      id: Math.floor(Math.random() * 100_000_000).toString(),
      name,
      parentId: null,
      topic: null,
      type: "GUILD_CATEGORY",
    };

    channelStore.setChannels([...channelStore.channels, channel]);

    setName("");
    closeModal(Modals.CREATE_CATEGORY);
  }

  return (
    <Modal
      style={createModalStyles({ content: { padding: "0", width: "25rem" } })}
      isOpen={isOpen(Modals.CREATE_CATEGORY)}
      onRequestClose={() => closeModal(Modals.CREATE_CATEGORY)}
    >
      <form onSubmit={onSubmit}>
        <div style={{ padding: "1rem" }}>
          <h1 className={styles.formHeader}>Create Category</h1>

          <div className={styles.formGroup}>
            <label htmlFor="channel_name">Category name</label>
            <input
              autoFocus
              id="channel_name"
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <footer className={styles.footer}>
          <button className={styles.formBtn}>Create</button>
        </footer>
      </form>
    </Modal>
  );
};
