import * as React from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { classes } from "utils/classes";
import styles from "./context.module.scss";

interface Props {
  items: (ContextItem | boolean)[];
  children: React.ReactChild;
}

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ContextItem extends ButtonProps {
  name: string;
  danger?: boolean;
}

export const ContextMenu = ({ items, children }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const ref = useOnclickOutside(() => setOpen(false));

  function onContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    setOpen(true);

    setCoords({ x: e.pageX + 10, y: e.pageY });
  }

  return (
    <>
      <div style={{ width: "100%" }} ref={ref} onContextMenu={onContextMenu}>
        {children}
      </div>

      <div
        ref={ref}
        style={{ top: coords.y, left: coords.x, display: open ? "flex" : "none" }}
        className={styles.contextMenu}
      >
        {items.map((item, idx) =>
          typeof item === "boolean" ? (
            <div className={styles.contextDivider} />
          ) : (
            <button
              key={`${item.name}-${idx}`}
              onClick={item.onClick}
              className={classes(styles.contextItem, item.danger && styles.danger)}
              {...item}
            >
              {item.name}
            </button>
          ),
        )}
      </div>
    </>
  );
};
