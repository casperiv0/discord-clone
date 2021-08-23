import * as React from "react";
import { BoxArrowUpIcon } from "icons/BowArrowUp";
import aboutStyles from "components/user-popup/popup.module.scss";
import styles from "./tabs.module.scss";
import { User } from "types/User";

interface Props {
  user: User;
}

export const UserInfoTab = ({ user }: Props) => {
  const [note, setNote] = React.useState("");

  return (
    <div className={styles.tab}>
      {user.bio ? (
        <>
          <h3 className={aboutStyles.header}>About me</h3>
          <div className={aboutStyles.aboutMe}>
            <p>{user.bio}</p>
          </div>
        </>
      ) : null}

      <div style={{ marginTop: user.bio ? "1rem" : 0 }}>
        <h3 className={aboutStyles.header}>Note</h3>
        <textarea
          placeholder="Click to add a note"
          className={aboutStyles.note}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {user.connections.length <= 0 ? null : <div className={aboutStyles.divider} />}

      <div className={styles.connections}>
        {user.connections.map((connection) => (
          <Connection key={connection.id} name={connection.name} url={connection.url} />
        ))}
      </div>
    </div>
  );
};

interface ConnectionProps {
  url: string;
  name: string;
}

const Connection = ({ name, url }: ConnectionProps) => {
  return (
    <div className={styles.connection}>
      <span>{name}</span>
      <a target="_blank" rel="noopener noreferrer" href={url}>
        <BoxArrowUpIcon width="15px" height="15px" fill="#96989b" />
      </a>
    </div>
  );
};
