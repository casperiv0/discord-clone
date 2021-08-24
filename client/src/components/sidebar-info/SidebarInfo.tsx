import * as React from "react";
import { SettingsIcon } from "icons/SettingsIcon";
import { useAuthStore } from "lib/state/authState";
import { useSettingsStore } from "lib/state/settingsState";
import styles from "./info.module.scss";
import { StatusMenu } from "./StatusMenu";

export const SidebarInfo = () => {
  const [isOpen, setOpen] = React.useState(false);
  const user = useAuthStore((s) => s.user);
  const openSettings = useSettingsStore((s) => s.setOpen);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.sidebarInfo}>
      <div>
        <img onClick={() => setOpen(true)} src={user.avatar!} />
        <div>
          <p>{user.username}</p>
          {user.statusMessage ? <span>{user.statusMessage}</span> : null}
        </div>
      </div>

      <button onClick={() => openSettings(true)} className={styles.button}>
        <SettingsIcon fill="#D9DADB" width="18px" height="18px" />
      </button>

      <StatusMenu isOpen={isOpen} onClose={() => setOpen(false)} />
    </div>
  );
};
