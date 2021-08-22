import { Guild } from "types/Guild";
import { getGuildInitials } from "utils/guild/getGuildInitials";
import styles from "components/guilds-list/guilds.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  guild: Pick<Guild, "icon" | "name">;
}

export const GuildIcon = ({ guild, ...rest }: Props) => {
  const guildInitials = getGuildInitials(guild.name);

  return (
    <div className={styles.guildItem} {...rest}>
      {guild.icon ? <img src={guild.icon} /> : <span>{guildInitials}</span>}
    </div>
  );
};
