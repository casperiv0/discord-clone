import * as React from "react";
import ReactModal from "react-modal";
import styles from "styles/modal.module.scss";
import { classes } from "utils/classes";
import { createModalStyles } from "utils/createModalStyles";

interface Props {
  isOpen: boolean;
  onClose: () => void;

  description: string | React.ReactFragment;
  title: string;
  actions: ModalAction[];
}

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface ModalAction extends ButtonProps {
  name: string;
  danger?: boolean;
}

export const AlertModal = (props: Props) => {
  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={createModalStyles({ content: { padding: "0" } })}
    >
      <h1 className={styles.alertTitle}>{props.title}</h1>

      <p className={styles.alertModalDescription}>{props.description}</p>

      <div className={styles.alertModalActions}>
        {props.actions.map(({ name, danger, onClick, ...rest }, idx) => {
          // spacer
          if (!name) return <p key={idx} />;

          return (
            <button
              onClick={onClick}
              key={idx}
              className={classes(styles.btn, danger && styles.danger)}
              {...rest}
            >
              {name}
            </button>
          );
        })}
      </div>
    </ReactModal>
  );
};
