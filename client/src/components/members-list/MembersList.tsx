import { useGuildStore } from "lib/state/guildsState";
import { MemberItem } from "./MemberItem";
import styles from "./members.module.scss";

export const MembersList = () => {
  const currentGuild = useGuildStore((s) => s.currentGuild);

  if (!currentGuild) {
    return null;
  }

  return (
    <div className={styles.membersList}>
      {currentGuild.members?.map((v) => (
        <MemberItem key={v.id} user={v} />
      ))}
    </div>
  );
};
