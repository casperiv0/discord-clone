import * as React from "react";
import { GuildHeader } from "components/guild-header/GuildHeader";
import { useChannelsStore } from "lib/state/channelsState";
import { ChannelItem } from "./ChannelItem";
import { sortChannels } from "utils/channel/sortChannels";
import { SidebarInfo } from "components/sidebar-info/SidebarInfo";
import styles from "./channels.module.scss";

export const ChannelsList = () => {
  const channels = useChannelsStore((s) => s.channels);

  return (
    <div className={styles.channelsList}>
      <GuildHeader />
      {sortChannels(channels).map((channel) => (
        <ChannelItem channel={channel} key={channel.id} />
      ))}

      <SidebarInfo />
    </div>
  );
};
