import * as React from "react";
import Markdown from "react-markdown";
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

const POPUP_HEIGHT = 339.5;

export const UserPopup = ({ user, children, width = "max-content", side = "right" }: Props) => {
  const [note, setNote] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [top, setTop] = React.useState(0);
  const [left, setLeft] = React.useState(0);

  const ref = useOnclickOutside(() => setOpen(false));

  function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLImageElement;
    const { left, width, top } = target.getBoundingClientRect();

    if (top >= 950) {
      setTop(top - POPUP_HEIGHT + 100);
      setLeft(left + width + 5);
    }
  }

  function handleOpen() {
    setModalOpen(true);
    setOpen(false);
  }

  return (
    <>
      <div style={{ width }} className={styles.popupContainer}>
        <div
          ref={ref}
          onClick={(e) => {
            onClick(e);
            setOpen((v) => !v);
          }}
        >
          {children}
        </div>
        {open ? (
          <div
            style={{
              position: top ? "fixed" : "absolute",
              top: top ? `${top}px` : undefined,
              left: left ? `${left}px` : undefined,
            }}
            ref={ref}
            className={classes(styles.popup, side)}
          >
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

                <p>{user.statusMessage}</p>
              </div>
              <div className={styles.divider} />

              {user.bio ? (
                <div className={styles.aboutMe}>
                  <h3 className={styles.header}>About Me</h3>
                  <span>
                    <Markdown linkTarget="_blank">{user.bio}</Markdown>
                  </span>
                </div>
              ) : null}

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
