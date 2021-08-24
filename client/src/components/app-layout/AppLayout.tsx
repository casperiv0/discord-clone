import * as React from "react";
import { ChannelsList } from "components/channel-list/ChannelsList";
import { GuildsList } from "components/guilds-list/GuildsList";
import { MembersList } from "components/members-list/MembersList";
import { MessagesList } from "components/messages-list/MessagesList";
import { CreateGuildModal } from "components/modals/CreateGuildModal";
import { SettingsOverlay } from "components/settings/SettingsOverlay";
import { SetStatusModal } from "components/modals/SetStatusModal";
import styles from "./layout.module.scss";

export const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <GuildsList />
      <ChannelsList />
      <MessagesList />
      <MembersList />

      <CreateGuildModal />
      <SettingsOverlay />
      <SetStatusModal />
    </div>
  );
};
