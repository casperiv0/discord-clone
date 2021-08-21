import { ChannelsList } from "components/channel-list/ChannelsList";
import { GuildsList } from "components/guilds-list/GuildsList";
import styles from "./layout.module.scss";

export const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <GuildsList />
      <ChannelsList />
    </div>
  );
};
