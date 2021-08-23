import * as React from "react";
import Modal from "react-modal";
import { createModalStyles } from "utils/createModalStyles";
import { useChannelsStore } from "lib/state/channelsState";
import { useGuildStore } from "lib/state/guildsState";
import { parseChannelName } from "utils/channel/parseChannelName";
import { createChannel } from "lib/actions/channel";
import { ChannelType } from "types/Channel";
import { socket } from "lib/socket";
import styles from "styles/form.module.scss";

interface Props {
  parentId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChannelModal = ({ isOpen, parentId, onClose }: Props) => {
  const [name, setName] = React.useState("");
  const channelStore = useChannelsStore();
  const currentGuild = useGuildStore((s) => s.currentGuild);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentGuild) return;

    const data = await createChannel({
      name,
      type: ChannelType.GUILD_TEXT,
      guildId: currentGuild.id,
      parentId,
    });

    if (data) {
      socket.emit("CHANNEL_CREATE", { guildId: currentGuild.id, channelId: data.id });
      channelStore.setChannels([...channelStore.channels, data]);

      setName("");
      onClose();
    }
  }

  return (
    <Modal
      style={createModalStyles({ content: { padding: "0", width: "25rem" } })}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <form onSubmit={onSubmit}>
        <div style={{ padding: "1rem" }}>
          <h1 className={styles.formHeader}>Create Text Channel</h1>

          <div className={styles.formGroup}>
            <label htmlFor="channel_name">Channel name</label>
            <input
              autoFocus
              id="channel_name"
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(parseChannelName(e.target.value))}
            />
          </div>
        </div>
        <footer className={styles.footer}>
          <button disabled={!name} className={styles.formBtn}>
            Create
          </button>
        </footer>
      </form>
    </Modal>
  );
};
