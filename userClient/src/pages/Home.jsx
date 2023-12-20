import { useState } from "react";
import styles from "../assets/Home.module.css";
import Blogs from "../components/Blogs";
import Login from "../components/Login";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      <div className={styles.container}>
        {/* <Nav /> */}
        <h2>Here Lies my Mark Zuckerberg Blog.</h2>
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </div>
      <Blogs
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
    </>
  );
};

export default Home;
