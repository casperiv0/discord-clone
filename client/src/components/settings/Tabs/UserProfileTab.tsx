import * as React from "react";
import styles from "./tabs.module.scss";
import form from "styles/form.module.scss";
import popup from "components/user-popup/popup.module.scss";
import { classes } from "utils/classes";
import { updateUserProfile } from "lib/actions/auth";

export const UserProfileTab = () => {
  const [about, setAbout] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    await updateUserProfile({
      bio: about,
    });
  }

  return (
    <div className={styles.tab}>
      <h1 className={styles.tabTitle}>User Profile</h1>

      <form onSubmit={onSubmit}>
        <div className={form.formGroup}>
          <label htmlFor="about_me" className={popup.header}>
            About Me
          </label>

          <p className={styles.aboutText}>You can use markdown and links if you&apos;d like.</p>

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            id="about_me"
            className={classes(form.formInput, styles.aboutMeInput)}
          />
        </div>

        <button style={{ marginTop: "0.5rem" }} className={form.formBtn}>
          Save
        </button>
      </form>
    </div>
  );
};
