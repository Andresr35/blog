import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../assets/CreateBlog.module.css";

const CreateBlog = ({ setAuthenticated }) => {
  const [input, setInput] = useState({
    title: "",
    message: "",
  });

  const postBlog = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: input.title,
          message: input.message,
        }),
      });
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        setAuthenticated(true);
      } else {
        console.log(res);
        setAuthenticated(false);
      }
    } catch (err) {
      console.log(err);
      setAuthenticated(false);
    }
  };
  return (
    <div>
      <form className={styles.container} onSubmit={postBlog}>
        <label className={styles.title}>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={input.title}
            placeholder="Enter Title"
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
        </label>
        <label className={styles.message}>
          <textarea
            type="text"
            name="message"
            id="message"
            value={input.message}
            required
            onChange={(e) => setInput({ ...input, message: e.target.value })}
            placeholder="Enter Message"
          />
        </label>
        <button type="Submit">Add Post</button>
      </form>
    </div>
  );
};

CreateBlog.propTypes = {
  setAuthenticated: PropTypes.func.isRequired,
};

export default CreateBlog;
