import * as React from "react";
import { Channel } from "types/Channel";
import styles from "./channel.module.scss";
import { TopicModal } from "./TopicModal";

interface Props {
  channel: Channel;
}

export const ChannelHeader = ({ channel }: Props) => {
  const [isOpen, setOpen] = React.useState(false);

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
