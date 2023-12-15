import styles from "../assets/Home.module.css";
import Blogs from "../components/Blogs";

const Home = () => {
  return (
    <div className={styles.container}>
      {/* <Nav /> */}
      <h2>Here Lies my Mark Zuckerberg Blog.</h2>
      <Blogs />
    </div>
  );
};

export default Home;
