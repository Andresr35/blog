import { useState } from "react";
import styles from "../assets/Home.module.css";
import Blogs from "../components/Blogs";
import Login from "../components/Login";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const url =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://blog-production-4e8c.up.railway.app";
  return (
    <>
      <div className={styles.container}>
        {/* <Nav /> */}
        <h2>Here Lies my Mark Zuckerberg Blog.</h2>
        <Login
          url={url}
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </div>
      <Blogs
        url={url}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
    </>
  );
};

export default Home;
