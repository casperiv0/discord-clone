import * as React from "react";
import ReactTooltip from "react-tooltip";
import Link from "next/link";
import { useRouter } from "next/router";
import { Channel } from "types/Channel";
import { classes } from "utils/classes";
import { isChannelActive } from "utils/channel/isChannelActive";
import styles from "./channels.module.scss";
import { PlusIcon } from "src/icons/Plus";
import { CreateChannelModal } from "components/modals/CreateChannelModal";
import { useModalStore } from "lib/state/modalState";
import { Modals } from "types/Modals";

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
    <div
      title={channel.name}
      className={classes(styles.channel, styles.textChannel, channelActive && styles.active)}
    >
      <Link href={href}>
        <a># {channel.name}</a>
      </Link>
    </div>
  );
};

const GuildCategory = ({ channel }: Props) => {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <div className={classes(styles.channel, styles.categoryChannel)}>
      <span title={channel.name}>{channel.name}</span>

      <button
        data-tip
        data-for={`create-channel-${channel.id}-tooltip`}
        className={styles.addChannel}
        onClick={() => openModal(Modals.CREATE_CHANNEL)}
      >
        <PlusIcon width="12px" height="12px" />
      </button>

      <ReactTooltip
        effect="solid"
        place="top"
        id={`create-channel-${channel.id}-tooltip`}
        className={styles.channelTooltip}
        arrowColor="#17181b"
        overridePosition={({ top, left }) => ({
          top: top + 15,
          left,
        })}
      >
        <span>Create channel</span>
      </ReactTooltip>

      <CreateChannelModal parentId={channel.type === "GUILD_CATEGORY" ? channel.id : null} />
    </div>
  );
};
