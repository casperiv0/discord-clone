import { User } from "types/User";
import styles from "./members.module.scss";

interface Props {
  user: User;
}

export const MemberItem = ({ user }: Props) => {
  return (
    <div className={styles.memberItem}>
      <img src={user.avatar!} />

      <h1>{user.username}</h1>
    </div>
  );
};
