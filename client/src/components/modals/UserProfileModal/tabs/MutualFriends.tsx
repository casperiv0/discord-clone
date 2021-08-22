import styles from "./tabs.module.scss";

export const MutualFriendsTab = () => {
  return (
    <div className={styles.tab}>
      <p className={styles.errorText}>No Friends In Common</p>
    </div>
  );
};
