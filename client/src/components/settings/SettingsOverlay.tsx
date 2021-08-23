import * as React from "react";
import * as ReactDOM from "react-dom";
import { useMounted, usePortal } from "@casper124578/useful";
import { SettingsSidebar } from "./Sidebar/SettingsSidebar";
import { MyAccountTab } from "./Tabs/MyAccountTab";
import { useSettingsStore } from "lib/state/settingsState";
import { UserProfileTab } from "./Tabs/UserProfileTab";
import styles from "./settings.module.scss";
import { PlusIcon } from "icons/Plus";

export enum SettingsTabs {
  MY_ACCOUNT,
  USER_PROFILE,
  PRIVACY_SAFETY,
  CONNECTIONS,
}

export const SettingsOverlay = () => {
  const { isOpen, activeTab, setActiveTab } = useSettingsStore();

  const portalRef = usePortal("Settings_Overlay");
  const isMounted = useMounted();

  if (!isOpen) {
    return null;
  }

  return isMounted && portalRef
    ? ReactDOM.createPortal(
        <div className={styles.settingsOverlay}>
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <TabRenderer activeTab={activeTab} />

          <CloseSettingsBtn />
        </div>,
        portalRef,
      )
    : null;
};

const CloseSettingsBtn = () => {
  const setOpen = useSettingsStore((s) => s.setOpen);

  return (
    <div className={styles.closeSettingsContainer}>
      <button onClick={() => setOpen(false)} className={styles.closeSettings}>
        <PlusIcon />
      </button>

      <span>ESC</span>
    </div>
  );
};

const TabRenderer = ({ activeTab }: { activeTab: number }) => {
  switch (activeTab) {
    case SettingsTabs.MY_ACCOUNT: {
      return <MyAccountTab />;
    }
    case SettingsTabs.USER_PROFILE: {
      return <UserProfileTab />;
    }
    default: {
      return null;
    }
  }
};
