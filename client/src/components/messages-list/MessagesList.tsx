import * as React from "react";
import { ChannelHeader } from "components/channel-header/ChannelHeader";
import { CreateMessage } from "components/create-message/CreateMessage";
import { MessageItem } from "components/message/Message";
import { useMessagesStore } from "lib/state/messagesState";
import { StartOfChannel } from "components/start-of-channel/StartOfChannel";
import styles from "./messages.module.scss";

export const MessagesList = () => {
  const { messages } = useMessagesStore();

  return (
    <>
      <ChannelHeader />
      <div className={styles.messagesList}>
        <CreateMessage />

        <div>
          {messages.map((message, idx) => {
            return <MessageItem key={message.id} idx={idx} message={message} />;
          })}
        </div>

        <StartOfChannel />
      </div>
    </>
  );
};
