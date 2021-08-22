import * as React from "react";
import Modal from "react-modal";
import { createModalStyles } from "utils/createModalStyles";
import styles from "styles/form.module.scss";
import { useGuildStore } from "lib/state/guildsState";
import { useModalStore } from "lib/state/modalState";
import { Modals } from "types/Modals";
import { createGuild } from "lib/actions/guild";
import { useAuthStore } from "lib/state/authState";

export const CreateGuildModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const user = useAuthStore((s) => s.user);

  const [name, setName] = React.useState("");
  const guildStore = useGuildStore();

  React.useEffect(() => {
    if (user) {
      setName(`${user.username}'s server`);
    }
  }, [user]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = await createGuild(name);

    if (data) {
      guildStore.setGuilds([...guildStore.guilds, data]);
      closeModal(Modals.CREATE_GUILD);
    }
  }

  return (
    <Modal
      style={createModalStyles({ content: { padding: "0", width: "25rem" } })}
      isOpen={isOpen(Modals.CREATE_GUILD)}
      onRequestClose={() => closeModal(Modals.CREATE_GUILD)}
    >
      <form onSubmit={onSubmit}>
        <div style={{ padding: "1rem" }}>
          <h1 className={styles.formHeader}>Create Guild</h1>

          <div className={styles.formGroup}>
            <label htmlFor="channel_name">Guild name</label>
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
