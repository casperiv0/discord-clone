import { User } from "types/User";
import styles from "./members.module.scss";

interface Props {
  member: { user: User; [key: string]: unknown };
}

export const MemberItem = ({ member }: Props) => {
  return (
    <div className={styles.memberItem}>
      <img src={member.user.avatar!} />

      <h1>{member.user.username}</h1>
    </div>
  );
};
