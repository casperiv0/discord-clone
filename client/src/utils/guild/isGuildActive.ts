/**
 * check if a guild is currently active/opened
 * @param routerId The guildId from the URL
 * @param guildId The guildId that needs to be checked
 */
export function isGuildActive(routerId: string, guildId: string) {
  return routerId === guildId;
}
