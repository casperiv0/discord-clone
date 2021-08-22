import * as React from "react";
import { useMessagesStore } from "state/messagesState";
import { PlusIcon } from "icons/Plus";
import styles from "./message.module.scss";
import { MOCK_USER } from "components/messages-list/MessagesList";

export const CreateMessage = () => {
  const [message, setMessage] = React.useState("");
  const messagesStore = useMessagesStore();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    messagesStore.setMessages([
      ...messagesStore.messages,
      {
        user: MOCK_USER,
        content: message,
        components: [],
        id: Math.floor(Math.random() * 10000).toString(),
        channelId: "1",
        guildId: "1",
      },
    ]);
  }

  return (
    <div className={styles.createMessageContainer}>
      <div className={styles.createMessage}>
        <button className={styles.filesBtn}>
          <PlusIcon width="12px" height="12px" />
        </button>
        <form onSubmit={onSubmit}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message #general"
          />
        </form>
      </div>
    </div>
  );
};
