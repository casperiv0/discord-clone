import useOnclickOutside from "react-cool-onclickoutside";
import { updateUserProfile } from "lib/actions/auth";
import { useAuthStore } from "lib/state/authState";
import { useModalStore } from "lib/state/modalState";
import { Modals } from "types/Modals";
import { StatusType } from "types/User";
import styles from "./info.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const StatusMenu = ({ isOpen, onClose }: Props) => {
  const ref = useOnclickOutside(onClose);
  const openModal = useModalStore((s) => s.openModal);
  const { user, setUser } = useAuthStore();

  async function updateStatus(status: StatusType) {
    await updateUserProfile({
      status,
    });

    setUser({ ...user!, status });
    onClose();
  }

  if (!user || !isOpen) {
    return null;
  }

  return (
    <div ref={ref} className={styles.statusMenu}>
      <button onClick={() => updateStatus(StatusType.ONLINE)} className={styles.menuItem}>
        Online
      </button>
      <button onClick={() => updateStatus(StatusType.IDLE)} className={styles.menuItem}>
        Idle
      </button>
      <button onClick={() => updateStatus(StatusType.DND)} className={styles.menuItem}>
        Do not disturb
      </button>
      <button onClick={() => updateStatus(StatusType.OFFLINE)} className={styles.menuItem}>
        Offline
      </button>

      <div className={styles.menuDivider} />

      <button
        onClick={() => {
          onClose();
          openModal(Modals.SET_STATUS);
        }}
        className={styles.menuItem}
      >
        {user.statusMessage ?? "Set status"}{" "}
      </button>
    </div>
  );
};
