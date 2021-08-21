import { MOCK_USER } from "components/messages-list/MessagesList";
import { GuildMember } from "types/Member";
import { MemberItem } from "./MemberItem";
import styles from "./members.module.scss";

const MOCK_MEMBERS: GuildMember[] = [
  {
    user: MOCK_USER,
    roles_ids: [],
    guildId: "1",
    nickname: null,
    userId: "1",
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
