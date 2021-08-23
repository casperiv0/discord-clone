import * as React from "react";
import ReactTooltip from "react-tooltip";
import Link from "next/link";
import { useRouter } from "next/router";
import { Channel, ChannelType } from "types/Channel";
import { classes } from "utils/classes";
import { isChannelActive } from "utils/channel/isChannelActive";
import styles from "./channels.module.scss";
import { PlusIcon } from "src/icons/Plus";
import { CreateChannelModal } from "components/modals/CreateChannelModal";
import { ContextMenu } from "components/context-menu/ContextMenu";

interface Props {
  channel: Channel;
}

export const ChannelItem = ({ channel }: Props) => {
  return channel.type === ChannelType.GUILD_CATEGORY ? (
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
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <ContextMenu
        items={[
          {
            name: "Mark as read",
            disabled: true,
            onClick: () => {
              alert("Clone!");
            },
          },
          true,
          {
            name: "Clone Category",
            onClick: () => {
              alert("Clone!");
            },
          },
          {
            name: "Create text channel",
            onClick: () => {
              setOpen(true);
            },
          },
          true,
          {
            name: "Delete category",
            danger: true,
            onClick: () => {
              alert("here");
            },
          },
          true,
          {
            name: "Copy ID",
            onClick: () => {
              navigator.clipboard.writeText(channel.id);
            },
          },
        ]}
      >
        <div className={classes(styles.channel, styles.categoryChannel)}>
          <span title={channel.name}>{channel.name}</span>

          <button
            data-tip
            data-for={`create-channel-${channel.id}-tooltip`}
            className={styles.addChannel}
            onClick={() => setOpen(true)}
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
        </div>
      </ContextMenu>
      <CreateChannelModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        parentId={channel.type === ChannelType.GUILD_CATEGORY ? channel.id : null}
      />
    </>
  );
};
