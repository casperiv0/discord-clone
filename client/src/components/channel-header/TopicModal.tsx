import ReactModal from "react-modal";
import { Channel } from "types/Channel";
import { createModalStyles } from "utils/createModalStyles";
import styles from "./channel.module.scss";

interface Props {
  channel: Channel;
  isOpen: boolean;
  onClose: () => void;
}

export const TopicModal = ({ channel, isOpen, onClose }: Props) => {
  return (
    <ReactModal
      className={styles.topicModal}
      onRequestClose={onClose}
      isOpen={isOpen}
      style={createModalStyles()}
    >
      <h1>#{channel.name}</h1>

      <p>{channel.topic}</p>
    </ReactModal>
  );
};
