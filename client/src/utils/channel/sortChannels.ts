import { Channel, ChannelType } from "types/Channel";

export function sortChannels(channels: Channel[]) {
  const categories = channels.filter((v) => v.type === ChannelType.GUILD_CATEGORY);

  const _channels = [];
  const _noCategoryChannels = channels.filter(
    (v) => v.parentId === null && v.type !== ChannelType.GUILD_CATEGORY,
  );

  for (const category of categories) {
    const ch = [...channels].filter((v) => v.parentId === category.id);
    _channels.push(...[category, ...ch]);
  }

  return [..._noCategoryChannels, ..._channels];
}
