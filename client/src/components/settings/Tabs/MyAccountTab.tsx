import * as React from "react";
import { useSettingsStore } from "lib/state/settingsState";
import { useAuthStore } from "lib/state/authState";
import { SettingsTabs } from "../SettingsOverlay";
// @ts-expect-error ignore.
import { header } from "components/user-popup/popup.module.scss";
import styles from "./tabs.module.scss";
import { DeleteAccountModal } from "../Modals/DeleteAccount";

enum AccountModals {
  EDIT_USERNAME,
  EDIT_EMAIL,
  EDIT_PASSWORD,
  DELETE_ACCOUNT,
}

export const MyAccountTab = () => {
  const [activeModal, setActiveModal] = React.useState<AccountModals | null>(null);
  const setActiveTab = useSettingsStore((s) => s.setActiveTab);
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.tab}>
        <h1 className={styles.tabTitle}>My Account</h1>
        <div className={styles.accountPreview}>
          <div className={styles.banner} />
          <div className={styles.avatarContainer}>
            <img src={user.avatar!} />
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <h1>
                {user.username}
                <span>#{user.tag}</span>
              </h1>
              <button
                className={styles.editProfileBtn}
                onClick={() => setActiveTab(SettingsTabs.USER_PROFILE)}
              >
                Edit profile
              </button>
            </div>
          </div>
          <div className={styles.userData}>
            <div className={styles.group}>
              <div>
                <label>username</label>
                <p>
                  {user.username}#<span>{user.tag}</span>
                </p>
              </div>
              <button
                onClick={() => setActiveModal(AccountModals.EDIT_USERNAME)}
                className={styles.editBtn}
              >
                Edit
              </button>
            </div>
            <div className={styles.group}>
              <div>
                <label>email</label>
                <p>{user.email}</p>
              </div>
              <button
                onClick={() => setActiveModal(AccountModals.EDIT_EMAIL)}
                className={styles.editBtn}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className={styles.tabDivider} />

        <div>
          <h3 className={header}>account removal</h3>
          <p style={{ margin: "0.5rem 0", color: "#b6b9bd" }}>This action cannot be undone.</p>

          <button
            onClick={() => setActiveModal(AccountModals.DELETE_ACCOUNT)}
            className={styles.deleteAccountBtn}
          >
            Delete Account
          </button>
        </div>
      </div>

      <DeleteAccountModal
        open={activeModal === AccountModals.DELETE_ACCOUNT}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
};
