import * as React from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { User } from "types/User";
import { classes } from "utils/classes";
import styles from "./popup.module.scss";

interface Props {
  user: User;
  children: React.ReactChild | React.ReactChild[];
  width?: React.CSSProperties["width"];
  side?: "left" | "right";
}

export const UserPopup = ({ user, children, width = "max-content", side = "right" }: Props) => {
  const [note, setNote] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const ref = useOnclickOutside(() => setOpen(false));

  return (
    <div style={{ width }} className={styles.popupContainer}>
      <div onClick={() => setOpen((v) => !v)}>{children}</div>

      {open ? (
        <div ref={ref} className={classes(styles.popup, side)}>
          <div className={styles.popupBanner} />

          <div className={styles.popupContent}>
            <div className={styles.username}>
              <h1>
                {user.username}
                <span className={styles.tag}>#{user.tag}</span>
              </h1>
            </div>

            <div className={styles.divider} />

            <input
              placeholder="Click to add a note"
              className={styles.note}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
