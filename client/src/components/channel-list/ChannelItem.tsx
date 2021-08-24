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
import { useChannelsStore } from "lib/state/channelsState";
import { createChannel, deleteChannel } from "lib/actions/channel";
import { AlertModal } from "components/modals/AlertModal";
import { Events, socket } from "lib/socket";

interface Props {
  channel: Channel;
  handleClone: () => Promise<void>;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChannelItem = ({ channel }: Pick<Props, "channel">) => {
  const [showDeleteAlert, setShowDelete] = React.useState(false);
  const { channels, setChannels, deleteChannel: delChannel } = useChannelsStore();

  const deleteText = channel.type === ChannelType.GUILD_CATEGORY ? "Category" : "Channel";

  async function handleClone() {
    const data = await createChannel({
      guildId: channel.guildId,
      name: channel.name,
      parentId: channel.parentId,
      type: channel.type,
    });

    if (data) {
      setChannels([...channels, data]);
      socket.emit(Events.CHANNEL_CREATE, { guildId: channel.guildId, channelId: channel.id });
    }
  }

  async function handleDelete() {
    delChannel(channel);
    await deleteChannel(channel.id);

    socket.emit(Events.CHANNEL_DELETE, { guildId: channel.guildId, channelId: channel.id });
  }

  return (
    <>
      {channel.type === ChannelType.GUILD_CATEGORY ? (
        <GuildCategory handleClone={handleClone} setShowDelete={setShowDelete} channel={channel} />
      ) : (
        <TextChannel handleClone={handleClone} setShowDelete={setShowDelete} channel={channel} />
      )}

      <AlertModal
        isOpen={showDeleteAlert}
        onClose={() => setShowDelete(false)}
        title={`Delete ${deleteText}`}
        actions={[
          {
            onClick: () => setShowDelete(false),
            name: "Cancel",
          },
          {
            onClick: handleDelete,
            danger: true,
            name: `Delete ${deleteText}`,
          },
        ]}
        description={
          <>
            Are you sure you want to delete <strong>#{channel.name}</strong>? This cannot be undone.
          </>
        }
      />
    </>
  );
};

const TextChannel = ({ channel, handleClone, setShowDelete }: Props) => {
  const router = useRouter();
  const href = `/${channel.guildId}/${channel.id}`;
  const channelActive = isChannelActive(router.query.channelId as string, channel.id);

  return (
    <>
      <ContextMenu
        items={[
          {
            name: "Mark as read",
            disabled: true,
            onClick: () => {
              alert("TODO!");
            },
          },
          true,
          {
            name: "Clone Channel",
            onClick: handleClone,
          },
          true,
          {
            name: "Delete Channel",
            danger: true,
            onClick: () => setShowDelete(true),
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
        <div
          title={channel.name}
          className={classes(styles.channel, styles.textChannel, channelActive && styles.active)}
        >
          <Link href={href}>
            <a># {channel.name}</a>
          </Link>
        </div>
      </ContextMenu>
    </>
  );
};

const GuildCategory = ({ channel, handleClone, setShowDelete }: Props) => {
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
            onClick: handleClone,
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
            onClick: () => setShowDelete(true),
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
