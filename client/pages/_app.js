import TopNav from "../components/TopNav.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd";
import "../public/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
