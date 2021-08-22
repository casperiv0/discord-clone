import * as React from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { UserProfileModal } from "components/modals/UserProfileModal";
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
  const [modalOpen, setModalOpen] = React.useState(false);

  const ref = useOnclickOutside(() => setOpen(false));

  function handleOpen() {
    setModalOpen(true);
    setOpen(false);
  }

  return (
    <>
      <div style={{ width }} className={styles.popupContainer}>
        <div ref={ref} onClick={() => setOpen((v) => !v)}>
          {children}
        </div>
        {open ? (
          // todo: fix top offset.
          <div ref={ref} className={classes(styles.popup, side)}>
            <div className={styles.bannerContainer}>
              <div className={styles.popupBanner} />
              <button onClick={handleOpen} className={styles.popupAvatar}>
                <img src={user.avatar!} />
              </button>
            </div>
            <div className={styles.popupContent}>
              <div className={styles.username}>
                <h1>
                  {user.username}
                  <span className={styles.tag}>#{user.tag}</span>
                </h1>
              </div>
              <div className={styles.divider} />
              <div className={styles.aboutMe}>
                <h3 className={styles.header}>About Me</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, alias?</p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <h3 className={styles.header}>Note</h3>
                <input
                  placeholder="Click to add a note"
                  className={styles.note}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <UserProfileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} user={user} />
    </>
  );
};
