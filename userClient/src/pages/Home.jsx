import styles from "../assets/Home.module.css";
import Blogs from "../components/Blogs";
import CreateBlog from "../components/CreateBlog";
import Login from "../components/Login";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        {/* <Nav /> */}
        <h2>Here Lies my Mark Zuckerberg Blog.</h2>
      </div>
      <Blogs />
      <CreateBlog />
      <Login />
    </>
  );
};

export default Home;
