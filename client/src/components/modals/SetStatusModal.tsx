import * as React from "react";
import ReactModal from "react-modal";
import { useModalStore } from "lib/state/modalState";
import { Modals } from "types/Modals";
import { createModalStyles } from "utils/createModalStyles";
import { useAuthStore } from "lib/state/authState";
import styles from "styles/form.module.scss";
import { updateUserProfile } from "lib/actions/auth";

export const SetStatusModal = () => {
  const [status, setStatus] = React.useState("");

  const { isOpen, closeModal } = useModalStore();
  const { user, setUser } = useAuthStore();

  React.useEffect(() => {
    setStatus(user?.statusMessage ?? "");
  }, [user]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    await updateUserProfile({ statusMessage: status || null });
    setUser({ ...user!, statusMessage: status || null });

    closeModal(Modals.SET_STATUS);
  }

  return (
    <ReactModal
      onRequestClose={() => closeModal(Modals.SET_STATUS)}
      isOpen={isOpen(Modals.SET_STATUS)}
      style={createModalStyles({ content: { padding: 0 } })}
    >
      <div style={{ padding: "1rem" }}>
        <h1 className={styles.formHeader}>Set a custom status</h1>

        <form id="change_status_form" style={{ marginTop: "1rem" }} onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="status">What&apos; cookin&apos;, {user?.username}</label>
            <input
              autoFocus
              id="status"
              className={styles.formInput}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </form>
      </div>
      <footer className={styles.footer}>
        <button
          style={{ padding: "0.5rem 1rem" }}
          className={styles.formBtn}
          form="change_status_form"
          type="submit"
        >
          Save
        </button>
      </footer>
    </ReactModal>
  );
};
