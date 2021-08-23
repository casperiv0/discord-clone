import * as React from "react";
import * as ReactDOM from "react-dom";
import { useMounted, usePortal } from "@casper124578/useful";
import styles from "./settings.module.scss";
import { SettingsSidebar } from "./Sidebar/SettingsSidebar";
import { MyAccountTab } from "./Tabs/MyAccountTab";
import { useSettingsStore } from "lib/state/settingsState";
import { UserProfileTab } from "./Tabs/UserProfileTab";

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
        </div>,
        portalRef,
      )
    : null;
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
