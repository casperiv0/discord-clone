import { io } from "socket.io-client";
import { Channel } from "types/Channel";
import { Message } from "types/Message";
import { useChannelsStore } from "./state/channelsState";
import { useMessagesStore } from "./state/messagesState";

export enum Events {
  MESSAGE_CREATE = "MESSAGE_CREATE",
  CHANNEL_CREATE = "CHANNEL_CREATE",

  CHANNEL_DELETE = "CHANNEL_DELETE",
  JOIN_CHANNEL = "JOIN_CHANNEL",
}

export const socket = io("http://localhost:3030", {
  withCredentials: true,
});

socket.on(Events.MESSAGE_CREATE, (data: Message) => {
  const { messages, setMessages } = useMessagesStore.getState();

  setMessages([...messages, data]);
});

socket.on(Events.CHANNEL_CREATE, (data: Channel) => {
  const { channels, setChannels } = useChannelsStore.getState();

  setChannels([...channels, data]);
});

socket.on(Events.CHANNEL_DELETE, (channelId: string) => {
  const { deleteChannel } = useChannelsStore.getState();

  deleteChannel({ id: channelId });
});
