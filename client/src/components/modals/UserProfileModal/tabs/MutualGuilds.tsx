import { GuildIcon } from "components/guild-icon/GuildIcon";
import Link from "next/link";
import { Guild } from "types/Guild";
import styles from "./tabs.module.scss";

export const MutualGuildsTab = () => {
  return (
    <div className={styles.tab}>
      <div className={styles.mutualGuilds}>
        <GuildItem name="Hello" icon="https://avatars.githubusercontent.com/u/53900565?v=4" />
        <GuildItem name="Second guild" icon={null} />
      </div>
    </div>
  );
};

type GuildProps = Pick<Guild, "name" | "icon">;

const GuildItem = ({ name, icon }: GuildProps) => {
  const href = "/1/2";

  return (
    <Link href={href}>
      <a className={styles.guildItem}>
        <GuildIcon
          style={{ height: "2.5rem", width: "2.5rem", borderRadius: "0.8rem" }}
          guild={{ name, icon }}
        />
        <p>{name}</p>
      </a>
    </Link>
  );
};
