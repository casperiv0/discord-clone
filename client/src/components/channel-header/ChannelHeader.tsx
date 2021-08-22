import * as React from "react";
import { useChannelsStore } from "lib/state/channelsState";
import styles from "./channel.module.scss";
import { TopicModal } from "./TopicModal";

export const ChannelHeader = () => {
  const channel = useChannelsStore((s) => s.currentChannel);
  const [isOpen, setOpen] = React.useState(false);

  if (!channel) {
    return null;
  }

  return (
    <div className={styles.channelHeader}>
      <div>
        <h1># {channel.name}</h1>
        {channel.topic ? (
          <p onClick={() => setOpen(true)} className={styles.channelTopic}>
            {channel.topic}
          </p>
        ) : null}
      </div>

      <input placeholder="Search" className={styles.search} />

      <TopicModal isOpen={isOpen} onClose={() => setOpen(false)} channel={channel} />
    </div>
  );
};
