import * as React from "react";
import { ChannelHeader } from "components/channel-header/ChannelHeader";
import { CreateMessage } from "components/create-message/CreateMessage";
import { MessageItem } from "components/message/Message";
import { useMessagesStore } from "lib/state/messagesState";
import styles from "./messages.module.scss";
import { StartOfChannel } from "components/start-of-channel/StartOfChannel";
import { socket } from "lib/socket";
import { Message } from "types/Message";

export const MOCK_USER = {
  avatar: "https://avatars.githubusercontent.com/u/53900565?v=4",
  email: "test@test.com",
  id: "1",
  username: "CasperTheGhost",
  tag: 4546,
};

export const MessagesList = () => {
  const { messages, setMessages } = useMessagesStore();

  React.useEffect(() => {
    const handler = (message: Message) => {
      console.log(message);

      setMessages([...messages, message]);
    };

    socket.on("MESSAGE_CREATE", handler);

    return () => {
      socket.off("MESSAGE_CREATE", handler);
    };
  });

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
