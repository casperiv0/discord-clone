import * as React from "react";
import ReactModal from "react-modal";
import { useModalStore } from "lib/state/modalState";
import { Modals } from "types/Modals";
import { createModalStyles } from "utils/createModalStyles";
import styles from "styles/form.module.scss";
import { generateGuildInvite } from "lib/actions/invites";
import { useGuildStore } from "lib/state/guildsState";

export const InviteModal = () => {
  const [invite, setInvite] = React.useState("");
  const { isOpen, closeModal } = useModalStore();
  const guild = useGuildStore((s) => s.currentGuild);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleFetch(guildId: string) {
    const inv = await generateGuildInvite(guildId);
    if (!inv) return;

    setInvite(inv.code);
  }

  function handleCopy() {
    navigator.clipboard.writeText(invite);
  }

  React.useEffect(() => {
    guild?.id && handleFetch(guild.id);
  }, [guild?.id]);

  return (
    <ReactModal
      isOpen={isOpen(Modals.INVITE)}
      onRequestClose={() => closeModal(Modals.INVITE)}
      style={createModalStyles({ content: { width: "25rem", padding: "1rem" } })}
    >
      <h1 className={styles.formHeader}>Invite users</h1>

      <div className={styles.formGroup}>
        <input disabled value={invite} readOnly className={styles.formInput} />
        <button onClick={handleCopy} className={styles.inputBtn}>
          Copy
        </button>
      </div>
    </ReactModal>
  );
};
