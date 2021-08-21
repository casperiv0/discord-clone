/**
 * check if a channel is currently active/opened
 * @param routerId The channelId from the URL
 * @param channelId The channelId that needs to be checked
 */
export function isChannelActive(routerId: string, channelId: string) {
  return routerId === channelId;
}
