import { UserPopup } from "components/user-popup/UserPopup";
import { Message } from "types/Message";
import styles from "./message.module.scss";

interface Props {
  message: Message;
}

export const MessageItem = ({ message }: Props) => {
  return (
    <div className={styles.messageContainer}>
      <UserPopup user={message.user}>
        <div className={styles.messageAvatar}>
          <img draggable={false} src="https://avatars.githubusercontent.com/u/53900565?v=4" />
        </div>
      </UserPopup>

      <div className={styles.message}>
        <UserPopup user={message.user}>
          <h3>{message.user.username}</h3>
        </UserPopup>
        <p>{message.content}</p>
      </div>
    </div>
  );
};
