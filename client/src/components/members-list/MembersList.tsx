import { MOCK_USER } from "components/messages-list/MessagesList";
import { MemberItem } from "./MemberItem";
import styles from "./members.module.scss";

const MOCK_MEMBERS = [
  {
    user: MOCK_USER,
    roles: [],
  },
];

export const MembersList = () => {
  return (
    <div className={styles.membersList}>
      {MOCK_MEMBERS.map((v) => (
        <MemberItem key={v.user.id} member={v} />
      ))}
    </div>
  );
};
