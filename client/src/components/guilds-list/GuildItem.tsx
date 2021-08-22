import { useChannelsStore } from "lib/state/channelsState";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { Guild } from "types/Guild";
import { classes } from "utils/classes";
import { getGuildInitials } from "utils/guild/getGuildInitials";
import { isGuildActive } from "utils/guild/isGuildActive";
import styles from "./guilds.module.scss";

interface Props {
  guild: Guild;
}

export const GuildItem = ({ guild }: Props) => {
  const router = useRouter();
  const channels = useChannelsStore((s) => s.channels);
  const firstTextChannel = channels.find((v) => v.type === "GUILD_TEXT");

  const href = guild.id === "@me" ? "/@me" : `/${guild.id}/${firstTextChannel?.id ?? "0"}`;
  const guildInitials = getGuildInitials(guild.name);
  const guildActive = isGuildActive(router.query.guildId as string, guild.id);

  return (
    <Link href={href}>
      <a
        data-tip
        data-for={`guild-${guild.id}-tooltip`}
        className={classes(
          styles.guildItem,
          !guild.icon && styles.backgroundHover,
          guildActive && styles.active,
        )}
      >
        {guild.icon ? <img src={guild.icon} /> : <p>{guildInitials}</p>}

        <ReactTooltip
          arrowColor="#17181b"
          overridePosition={({ left, top }) => {
            return { top, left: left + 10 };
          }}
          className={styles.guildTooltip}
          place="left"
          effect="solid"
          id={`guild-${guild.id}-tooltip`}
        >
          <span>{guild.name}</span>
        </ReactTooltip>
      </a>
    </Link>
  );
};
