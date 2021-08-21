import { ChannelHeader } from "components/channel-header/ChannelHeader";
import { MOCK_CHANNELS } from "components/channel-list/ChannelsList";
import { CreateMessage } from "components/create-message/CreateMessage";
import { MessageItem } from "components/message/Message";
import { Message } from "types/Message";
import styles from "./messages.module.scss";

export const MOCK_USER = {
  avatar: "https://avatars.githubusercontent.com/u/53900565?v=4",
  email: "test@test.com",
  id: "1",
  username: "CasperTheGhost",
  tag: 4546,
};

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    guildId: "1",
    channelId: "1",
    components: [],
    content: "Hello world! This is a test.",
    user: MOCK_USER,
  },
  {
    id: "2",
    guildId: "1",
    channelId: "1",
    components: [],
    content: "Another Message!",
    user: MOCK_USER,
  },
  {
    id: "3",
    guildId: "1",
    channelId: "1",
    components: [],
    content: "Yay!",
    user: MOCK_USER,
  },
];

export const MessagesList = () => {
  return (
    <>
      <ChannelHeader channel={MOCK_CHANNELS[1]!} />
      <div className={styles.messagesList}>
        <CreateMessage />

        {MOCK_MESSAGES.map((message) => {
          return <MessageItem key={message.id} message={message} />;
        })}
      </div>
    </>
  );
};
