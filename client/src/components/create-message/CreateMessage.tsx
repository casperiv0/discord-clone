import { PlusIcon } from "src/icons/Plus";
import styles from "./message.module.scss";

export const CreateMessage = () => {
  return (
    <div className={styles.createMessage}>
      <button className={styles.filesBtn}>
        <PlusIcon width="12px" height="12px" />
      </button>

      <form onSubmit={(e) => e.preventDefault()}>
        <input placeholder="Message #general" />
      </form>
    </div>
  );
};
