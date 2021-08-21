import Modal from "react-modal";

export function createModalStyles(styles: Modal.Styles = {}): Modal.Styles {
  return {
    content: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",

      maxWidth: "95%",
      width: "500px",
      height: "max-content",
      maxHeight: "800px",

      background: "#36393F",
      border: "none",
      borderRadius: "0.5rem",
      padding: "0.2rem 0.5rem",
      ...styles.content,
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      ...styles.overlay,
    },
  };
}
