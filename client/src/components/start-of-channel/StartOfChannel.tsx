import { useChannelsStore } from "lib/state/channelsState";
import styles from "./channel.module.scss";

export const StartOfChannel = () => {
  const channel = useChannelsStore((s) => s.currentChannel);

  if (!channel) {
    return null;
  }

  return (
    <div className={styles.startOfChannel}>
      <h1>Welcome to #{channel.name}!</h1>

      <p>This is the start of the #{channel.name} channel.</p>
    </div>
  );
};
