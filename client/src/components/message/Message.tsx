import { UserPopup } from "components/user-popup/UserPopup";
import { useMessagesStore } from "lib/state/messagesState";
import { Message } from "types/Message";
import { classes } from "utils/classes";
import styles from "./message.module.scss";

interface Props {
  message: Message;
  idx: number;
}

export const MessageItem = ({ message, idx }: Props) => {
  const messages = useMessagesStore((s) => s.messages);
  const prevMessage = () => {
    const m = messages[idx - 1];
    return m?.user.id === message.user.id ? m : undefined;
  };

  const nextMessage = () => {
    const m = messages[idx + 1];
    return m?.user.id === message.user.id ? m : undefined;
  };

  const style = prevMessage() ? styles.oneMessage : nextMessage() ? styles.last : undefined;

  return (
    <div className={classes(styles.messageContainer, style)}>
      {prevMessage() ? null : (
        <UserPopup user={message.user}>
          <div className={styles.messageAvatar}>
            <img draggable={false} src={message.user.avatar!} />
          </div>
        </UserPopup>
      )}

      <div className={classes(styles.message, style)}>
        {prevMessage() ? null : (
          <UserPopup user={message.user}>
            <h3>{message.user.username}</h3>
          </UserPopup>
        )}

        <p>{message.content}</p>
      </div>
    </div>
  );
};
