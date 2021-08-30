import { deleteAccount } from "lib/actions/auth";
import { useAuthStore } from "lib/state/authState";
import { useRouter } from "next/router";
import * as React from "react";
import ReactModal from "react-modal";
import form from "styles/form.module.scss";
import { createModalStyles } from "utils/createModalStyles";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const DeleteAccountModal = ({ open, onClose }: Props) => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [password, setPassword] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = await deleteAccount(password);

    if (data) {
      setUser(null);
      router.push("/");
    }
  }

  return (
    <ReactModal
      style={createModalStyles({ content: { padding: 0 } })}
      isOpen={open}
      onRequestClose={onClose}
    >
      <h1 style={{ padding: "0.5rem 0" }} className={form.formHeader}>
        Delete account
      </h1>

      <p style={{ padding: "0.5rem 1rem", color: "#b6b9bd" }}>
        Are you sure you want to delete your account? This will delete all your guilds and messages.
      </p>

      <form onSubmit={onSubmit}>
        <div style={{ padding: "0.5rem 1rem" }}>
          <div className={form.formGroup}>
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              id="confirm-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={form.formInput}
              type="password"
            />
          </div>
        </div>

        <footer className={form.footer}>
          <button style={{ background: "#C02D36" }} className={form.formBtn}>
            Delete account
          </button>
        </footer>
      </form>
    </ReactModal>
  );
};
