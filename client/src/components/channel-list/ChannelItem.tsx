import ReactTooltip from "react-tooltip";
import Link from "next/link";
import { useRouter } from "next/router";
import { Channel } from "types/Channel";
import { classes } from "utils/classes";
import { isChannelActive } from "utils/channel/isChannelActive";
import styles from "./channels.module.scss";

interface Props {
  channel: Channel;
}

export const ChannelItem = ({ channel }: Props) => {
  return channel.type === "GUILD_CATEGORY" ? (
    <GuildCategory channel={channel} />
  ) : (
    <TextChannel channel={channel} />
  );
};

const TextChannel = ({ channel }: Props) => {
  const router = useRouter();
  const href = `/${channel.guildId}/${channel.id}`;
  const channelActive = isChannelActive(router.query.channelId as string, channel.id);

  return (
    <div className={classes(styles.channel, styles.textChannel, channelActive && styles.active)}>
      <Link href={href}>
        <a># {channel.name}</a>
      </Link>
    </div>
  );
};

const GuildCategory = ({ channel }: Props) => {
  return (
    <div className={classes(styles.channel, styles.categoryChannel)}>
      {channel.name}

      <button
        data-tip
        data-for={`create-channel-${channel.id}-tooltip`}
        className={styles.addChannel}
      >
        +
      </button>

      <ReactTooltip
        effect="solid"
        place="top"
        id={`create-channel-${channel.id}-tooltip`}
        className={styles.channelTooltip}
        arrowColor="#17181b"
      >
        <span>Create channel</span>
      </ReactTooltip>
    </div>
  );
};
