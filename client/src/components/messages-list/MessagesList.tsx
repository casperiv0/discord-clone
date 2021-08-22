import * as React from "react";
import { ChannelHeader } from "components/channel-header/ChannelHeader";
import { CreateMessage } from "components/create-message/CreateMessage";
import { MessageItem } from "components/message/Message";
import { useMessagesStore } from "lib/state/messagesState";
import { Message } from "types/Message";
import styles from "./messages.module.scss";
import { StartOfChannel } from "components/start-of-channel/StartOfChannel";

export const MOCK_USER = {
  avatar: "https://avatars.githubusercontent.com/u/53900565?v=4",
  email: "test@test.com",
  id: "1",
  username: "CasperTheGhost",
  tag: 4546,
};

export const MOCK_USER_2 = {
  avatar:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.wH8PXFtdeLjkA520lhSsEQHaEK%26pid%3DApi&f=1",
  email: "test@test2.com",
  id: "2",
  username: "Ghost",
  tag: 5005,
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    guildId: "1",
    channelId: "2",
    components: [],
    content: "Hello world! This is a test.",
    user: MOCK_USER,
  },
  {
    id: "2",
    guildId: "1",
    channelId: "2",
    components: [],
    content: "Another Message!",
    user: MOCK_USER,
  },
  {
    id: "3",
    guildId: "1",
    channelId: "2",
    components: [],
    content: "Yay!",
    user: MOCK_USER,
  },
  {
    id: "4",
    guildId: "1",
    channelId: "2",
    components: [],
    content: "Hello world",
    user: MOCK_USER_2,
  },
  {
    id: "5",
    guildId: "1",
    channelId: "2",
    components: [],
    content: "Super cool!",
    user: MOCK_USER_2,
  },
  {
    id: "6",
    guildId: "1",
    channelId: "2",
    components: [],
    content: "Yes, indeed!",
    user: MOCK_USER,
  },
];

export const MessagesList = () => {
  const messages = useMessagesStore((s) => s.messages);

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
