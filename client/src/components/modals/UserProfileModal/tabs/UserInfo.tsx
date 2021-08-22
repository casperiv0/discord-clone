import * as React from "react";
import { BoxArrowUpIcon } from "icons/BowArrowUp";
import aboutStyles from "components/user-popup/popup.module.scss";
import styles from "./tabs.module.scss";

export const UserInfoTab = () => {
  const [note, setNote] = React.useState("");

  return (
    <div className={styles.tab}>
      <h3 className={aboutStyles.header}>About me</h3>

      <div className={aboutStyles.aboutMe}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit cum natus non aperiam
          iusto expedita dolore obcaecati sequi quas consectetur!
        </p>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3 className={aboutStyles.header}>Note</h3>
        <textarea
          placeholder="Click to add a note"
          className={aboutStyles.note}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className={aboutStyles.divider} />

      <div className={styles.connections}>
        <Connection name="Dev-CasperTheGhost" url="https://github.com/dev-caspertheghost" />
        <Connection name="casper124578" url="https://twitter.com/casper124578" />
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
