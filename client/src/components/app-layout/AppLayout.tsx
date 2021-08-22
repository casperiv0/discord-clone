import { ChannelsList } from "components/channel-list/ChannelsList";
import { GuildsList } from "components/guilds-list/GuildsList";
import { MembersList } from "components/members-list/MembersList";
import { MessagesList } from "components/messages-list/MessagesList";
import { CreateGuildModal } from "components/modals/CreateGuildModal";
import styles from "./layout.module.scss";

export const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <GuildsList />
      <ChannelsList />
      <MessagesList />
      <MembersList />

      <CreateGuildModal />
    </div>
  );
};
