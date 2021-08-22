import * as React from "react";
import Modal from "react-modal";
import { createModalStyles } from "utils/createModalStyles";
import { User } from "types/User";
import styles from "./user.module.scss";

interface Props {
  user: User;

  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal = ({ user, isOpen, onClose }: Props) => {
  console.log(user);

  return (
    <Modal
      style={createModalStyles({
        content: { background: "#18191C", padding: "0", width: "40rem" },
      })}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className={styles.bannerContainer}>
        <div className={styles.banner} />

        <div className={styles.bannerAvatar}>
          <img draggable={false} src={user.avatar!} />
        </div>
      </div>

      <div className={styles.userInfo}>
        <h1>
          {user.username}#<span className={styles.tag}>{user.tag}</span>
        </h1>

        <p className={styles.status}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aperiam.
        </p>
      </div>

      {/* todo: add tabs */}
    </Modal>
  );
};
