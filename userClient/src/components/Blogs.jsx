import { useEffect, useState } from "react";
import styles from "../assets/Blogs.module.css";
import PropTypes from "prop-types";
import CreateBlog from "./CreateBlog";

const Blogs = ({ authenticated, setAuthenticated }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3000/api/post", {
      headers: {
        accepts: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => setBlogs(response.posts))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // TODO : add in something to give different results on whether someone is authenticated or not
  const deletePost = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const result = await res.json();
        console.log(result);
        setAuthenticated(true);
        fetchData();
      } else {
        setAuthenticated(false);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (e, commentID, blogID) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/post/${blogID}/comment/${commentID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.ok) {
        const result = await res.json();
        console.log(result);
        setAuthenticated(true);
        fetchData();
      } else {
        setAuthenticated(false);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/post/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: e.target.comment.value,
        }),
      });
      if (res.ok) {
        const result = await res.json();
        console.log(result);
        setAuthenticated(false);
        fetchData();
      } else {
        setAuthenticated(false);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };

  return (
    <>
      {authenticated && <CreateBlog setAuthenticated={setAuthenticated} />}

      <div className={styles.blogsContainer}>
        <h3>Current Posts</h3>
        {blogs.length == 0
          ? ""
          : blogs.map((blog, index) => (
              <div key={index} className={styles.blogContainer}>
                <h4>{blog.title}</h4>
                <hr />
                <p>{blog.message}</p>
                <p className={styles.timestamp}>Created: {blog.date}</p>
                <div className={styles.commentsContainer}>
                  {blog.comments.map((comment, index) => (
                    <div key={index} className={styles.commentContainer}>
                      <p>{comment.message}</p>
                      {authenticated && (
                        <button
                          className={styles.delete}
                          onClick={(e) =>
                            deleteComment(e, comment._id, blog._id)
                          }
                        >
                          <img
                            src="../../delete-svgrepo-com.svg"
                            alt="Delete Button"
                          />
                        </button>
                      )}
                    </div>
                  ))}
                  <form
                    className={styles.addComment}
                    onSubmit={(e) => addComment(e, blog._id)}
                  >
                    <input
                      type="text"
                      name="comment"
                      placeholder="Add Comment"
                    />
                    <button className={styles.add} type="submit">
                      <img
                        src="../../checkmark-svgrepo-com.svg"
                        alt="Delete Button"
                      />
                    </button>
                  </form>
                </div>
                {authenticated && (
                  <button
                    className={styles.delete}
                    onClick={(e) => deletePost(e, blog._id)}
                  >
                    <img
                      src="../../delete-svgrepo-com.svg"
                      alt="Delete Button"
                    />
                  </button>
                )}
              </div>
            ))}
      </div>
    </>
  );
};

Blogs.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

export default Blogs;
