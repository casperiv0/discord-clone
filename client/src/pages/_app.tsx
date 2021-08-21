import { AppProps } from "next/app";
import Modal from "react-modal";
import "styles/global.scss";

Modal.setAppElement("#__next");

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
