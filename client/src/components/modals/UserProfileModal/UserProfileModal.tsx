import * as React from "react";
import Modal from "react-modal";
import { createModalStyles } from "utils/createModalStyles";
import { User } from "types/User";
import styles from "./user.module.scss";
import tabStyles from "./tabs/tabs.module.scss";
import { classes } from "utils/classes";
import { UserInfoTab } from "./tabs/UserInfo";
import { MutualFriendsTab } from "./tabs/MutualFriends";
import { MutualGuildsTab } from "./tabs/MutualGuilds";

interface Props {
  user: User;

  isOpen: boolean;
  onClose: () => void;
}

enum Tabs {
  USER_PROFILE,
  ACTIVITY,
  MUTUAL_SERVERS,
  MUTUAL_FRIENDS,
}

export const UserProfileModal = ({ user, isOpen, onClose }: Props) => {
  const [activeTab, setActiveTab] = React.useState<Tabs>(Tabs.USER_PROFILE);

  function tabStyle(v: number) {
    return v === activeTab ? tabStyles.active : undefined;
  }

  React.useEffect(() => {
    setActiveTab(Tabs.USER_PROFILE);
  }, [isOpen]);

  return (
    <Modal
      style={createModalStyles({
        content: { background: "#18191C", padding: "0", width: "40rem" },
      })}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className={styles.bannerContainer}>
        <div className={styles.banner} />

        <div className={styles.bannerAvatar}>
          <img draggable={false} src={user.avatar!} />
        </div>
      </div>

      <div className={styles.userInfo}>
        <h1>
          {user.username}#<span className={styles.tag}>{user.tag}</span>
        </h1>

        <p className={styles.status}>{user.status}</p>
      </div>

      <div className={tabStyles.tabsContainer}>
        <button
          onClick={() => setActiveTab(Tabs.USER_PROFILE)}
          className={classes(tabStyles.tabSelector, tabStyle(Tabs.USER_PROFILE))}
        >
          User Info
        </button>
        <button
          onClick={() => setActiveTab(Tabs.ACTIVITY)}
          className={classes(tabStyles.tabSelector, tabStyle(Tabs.ACTIVITY))}
        >
          Activity
        </button>
        <button
          onClick={() => setActiveTab(Tabs.MUTUAL_SERVERS)}
          className={classes(tabStyles.tabSelector, tabStyle(Tabs.MUTUAL_SERVERS))}
        >
          Mutual Server
        </button>
        <button
          onClick={() => setActiveTab(Tabs.MUTUAL_FRIENDS)}
          className={classes(tabStyles.tabSelector, tabStyle(Tabs.MUTUAL_FRIENDS))}
        >
          Mutual Friends
        </button>
      </div>

      <div className={tabStyles.tabs}>
        <RenderTabs user={user} activeTab={activeTab} />
      </div>
    </Modal>
  );
};

const RenderTabs = ({ activeTab, user }: { activeTab: number; user: User }) => {
  switch (activeTab) {
    case Tabs.ACTIVITY: {
      return <div className={tabStyles.tab}>it&apos;s empty here.</div>;
    }
    case Tabs.MUTUAL_FRIENDS: {
      return <MutualFriendsTab />;
    }
    case Tabs.MUTUAL_SERVERS: {
      return <MutualGuildsTab />;
    }
    case Tabs.USER_PROFILE: {
      return <UserInfoTab user={user} />;
    }
    default: {
      return null;
    }
  }
};
