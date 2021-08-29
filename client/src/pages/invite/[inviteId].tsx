import { GuildIcon } from "components/guild-icon/GuildIcon";
import { acceptGuildInvite, getInviteInfo } from "lib/actions/invites";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Guild } from "types/Guild";
import { Invite } from "types/Invite";
import styles from "./invite.module.scss";

interface Props {
  invite: (Invite & { guild: Guild }) | null;
}

export default function InvitePage({ invite }: Props) {
  const router = useRouter();

  async function onAccept() {
    if (!invite) return;
    const data = await acceptGuildInvite(invite.code);

    if (data) {
      router.push(`/${invite.guildId}/0`);
    }
  }

  return (
    <div className={styles.inviteContainer}>
      {!invite ? (
        <div className={styles.inviteContent}>
          <h1>Invite Invalid</h1>

          <p>This invite may be expired, or you might not have permission to join.</p>

          <a className={styles.continueBtn} href="/">
            Continue to Discord
          </a>
        </div>
      ) : (
        <div className={styles.inviteContent}>
          <GuildIcon
            guild={invite.guild}
            style={{
              marginBottom: "1rem",
              width: "4rem",
              height: "4rem",
              borderRadius: "0.8rem",
              fontSize: "1.5rem",
              cursor: "default",
            }}
          />

          <p>You&apos;ve been invited to join</p>

          <h1 style={{ fontSize: "1.5rem" }}>{invite.guild.name}</h1>

          <button onClick={onAccept} className={styles.continueBtn}>
            Accept Invite
          </button>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, req }) => {
  const inviteId = query.inviteId as string;
  const cookie = req.headers.cookie;

  const invite = await getInviteInfo(inviteId, cookie);

  return {
    props: {
      invite,
    },
  };
};
