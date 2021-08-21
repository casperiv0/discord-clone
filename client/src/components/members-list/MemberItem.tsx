import { GuildMember } from "types/Member";
import styles from "./members.module.scss";

interface Props {
  member: GuildMember;
}

export const MemberItem = ({ member }: Props) => {
  return (
    <div className={styles.memberItem}>
      <img src={member.user.avatar!} />

      <h1>{member.user.username}</h1>
    </div>
  );
};
