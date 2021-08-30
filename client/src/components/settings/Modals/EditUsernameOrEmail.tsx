import { updateUserAccount } from "lib/actions/auth";
import { useAuthStore } from "lib/state/authState";
import * as React from "react";
import ReactModal from "react-modal";
import form from "styles/form.module.scss";
import { createModalStyles } from "utils/createModalStyles";

interface Props {
  open: boolean;
  onClose: () => void;

  type: "email" | "username";
  emailOrUsername: string;
}

export const EditEmailOrUsernameModal = ({ type, emailOrUsername, open, onClose }: Props) => {
  const { setUser, user } = useAuthStore();

  const [value, setValue] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = await updateUserAccount({
      [type]: value,
    });

    if (!(data instanceof Error)) {
      setUser({ ...user!, [type]: value });
      onClose();
    }
  }

  React.useEffect(() => {
    setValue(emailOrUsername);
  }, [emailOrUsername]);

  return (
    <ReactModal
      style={createModalStyles({ content: { padding: 0 } })}
      isOpen={open}
      onRequestClose={onClose}
    >
      <h1 style={{ padding: "0.5rem 0" }} className={form.formHeader}>
        {type === "email" ? "Enter an email address" : "Change your username"}
      </h1>

      <p className={form.formInfo}>Enter a new username and your existing password.</p>

      <form onSubmit={onSubmit}>
        <div style={{ padding: "0.5rem 1rem" }} className={form.formGroup}>
          <label htmlFor={type}>{type}</label>
          <input
            id={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={form.formInput}
            type={type === "email" ? "email" : "text"}
            autoComplete="false"
          />
        </div>
        <div style={{ padding: "0.5rem 1rem" }} className={form.formGroup}>
          <label htmlFor="confirm-password">Current password</label>
          <input
            id="confirm-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={form.formInput}
            type="password"
            autoComplete="false"
          />
        </div>

        <footer className={form.footer}>
          <button className={form.formBtn}>Done</button>
        </footer>
      </form>
    </ReactModal>
  );
};
