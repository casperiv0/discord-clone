import * as React from "react";
import { GuildHeader } from "components/guild-header/GuildHeader";
import { useChannelsStore } from "lib/state/channelsState";
import { ChannelItem } from "./ChannelItem";
import styles from "./channels.module.scss";
import { sortChannels } from "utils/channel/sortChannels";
import { Channel } from "types/Channel";
import { socket } from "lib/socket";

export const ChannelsList = () => {
  const channels = useChannelsStore((s) => s.channels);
  const setChannels = useChannelsStore((s) => s.setChannels);

  React.useEffect(() => {
    const handler = (channel: Channel) => {
      setChannels([...channels, channel]);
    };

    socket.on("CHANNEL_CREATE", handler);

    return () => {
      socket.off("CHANNEL_CREATE", handler);
    };
  }, [setChannels, channels]);

  return (
    <div className={styles.channelsList}>
      <GuildHeader />
      {sortChannels(channels).map((channel) => (
        <ChannelItem channel={channel} key={channel.id} />
      ))}
    </div>
  );
};
