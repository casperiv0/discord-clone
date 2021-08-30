import { classes } from "utils/classes";
import { SettingsTabs } from "../SettingsOverlay";
import styles from "./sidebar.module.scss";

interface Props {
  activeTab: SettingsTabs;
  setActiveTab: (id: number) => void;
}

export const SettingsSidebar = ({ activeTab, setActiveTab }: Props) => {
  const isActive = (id: number) => (activeTab === id ? styles.active : undefined);

  return (
    <aside className={styles.settingsSidebar}>
      <div>
        <header className={styles.header}>user settings</header>
        <button
          onClick={() => setActiveTab(SettingsTabs.MY_ACCOUNT)}
          className={classes(styles.sidebarItem, isActive(SettingsTabs.MY_ACCOUNT))}
        >
          My Account
        </button>
        <button
          onClick={() => setActiveTab(SettingsTabs.USER_PROFILE)}
          className={classes(styles.sidebarItem, isActive(SettingsTabs.USER_PROFILE))}
        >
          User Profile
        </button>
        <button
          onClick={() => setActiveTab(SettingsTabs.PRIVACY_SAFETY)}
          className={classes(styles.sidebarItem, isActive(SettingsTabs.PRIVACY_SAFETY))}
        >
          Privacy {"&"} Safety
        </button>
        <button
          onClick={() => setActiveTab(SettingsTabs.CONNECTIONS)}
          className={classes(styles.sidebarItem, isActive(SettingsTabs.CONNECTIONS))}
        >
          Connections
        </button>

        <div className={styles.sidebarDivider} />
        <button className={classes(styles.sidebarItem, styles.danger)}>Log Out</button>
      </div>
    </aside>
  );
};
