import { CreateMessage } from "components/create-message/CreateMessage";
import { MessageItem } from "components/message/Message";
import { Message } from "types/Message";
import styles from "./messages.module.scss";

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    guildId: "1",
    channelId: "1",
    components: [],
    content: "Hello world! This is a test.",
    user: {
      avatar: null,
      email: "test@test.com",
      id: "1",
      username: "CasperTheGhost",
      tag: 4546,
    },
  },
  {
    id: "2",
    guildId: "1",
    channelId: "1",
    components: [],
    content: "Another Message!",
    user: {
      avatar: null,
      email: "test@test.com",
      id: "1",
      username: "CasperTheGhost",
      tag: 4546,
    },
  },
  {
    id: "3",
    guildId: "1",
    channelId: "1",
    components: [],
    content: "Yay!",
    user: {
      avatar: null,
      email: "test@test.com",
      id: "1",
      username: "CasperTheGhost",
      tag: 4546,
    },
  },
];

export const MessagesList = () => {
  return (
    <div className={styles.messagesList}>
      <CreateMessage />

      {MOCK_MESSAGES.map((message) => {
        return <MessageItem key={message.id} message={message} />;
      })}
    </div>
  );
};
