import { SettingsIcon } from "icons/SettingsIcon";
import { useAuthStore } from "lib/state/authState";
import { useSettingsStore } from "lib/state/settingsState";
import styles from "./info.module.scss";

export const SidebarInfo = () => {
  const user = useAuthStore((s) => s.user);
  const openSettings = useSettingsStore((s) => s.setOpen);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.sidebarInfo}>
      <div>
        <img src={user.avatar!} />
        <p>{user.username}</p>
      </div>

      <button onClick={() => openSettings(true)} className={styles.button}>
        <SettingsIcon fill="#D9DADB" width="18px" height="18px" />
      </button>
    </div>
  );
};
