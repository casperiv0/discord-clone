import * as React from "react";
import { PlusIcon } from "icons/Plus";
import styles from "./message.module.scss";
import { socket } from "lib/socket";
import { useGuildStore } from "lib/state/guildsState";
import { useChannelsStore } from "lib/state/channelsState";

export const CreateMessage = () => {
  const [message, setMessage] = React.useState("");
  const ref = React.useRef<HTMLInputElement>(null);
  const currentGuild = useGuildStore((s) => s.currentGuild);
  const currentChannel = useChannelsStore((s) => s.currentChannel);

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message || !currentChannel || !currentGuild) return;

    setMessage("");

    socket.emit("MESSAGE_CREATE", {
      content: message,
      channelId: currentChannel.id,
      guildId: currentGuild.id,
    });
  }

  return (
    <div className={styles.createMessageContainer}>
      <div className={styles.createMessage}>
        <button className={styles.filesBtn}>
          <PlusIcon width="12px" height="12px" />
        </button>
        <form onSubmit={onSubmit}>
          <input
            ref={ref}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message #general"
          />
        </form>
      </div>
    </div>
  );
};
