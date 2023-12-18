import { useEffect, useState } from "react";
import styles from "../assets/Blogs.module.css";
import PropTypes from "prop-types";

const Blogs = ({ authenticated, setAuthenticated }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
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
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Current Posts</h3>
      <div className={styles.blogsContainer}>
        {blogs.length == 0
          ? ""
          : blogs.map((blog, index) => (
              <div key={index} className={styles.blogContainer}>
                <h4>{blog.title}</h4>
                <p>{blog.message}</p>
                <p className={styles.timestamp}>Created: {blog.date}</p>
                {authenticated && (
                  <button onClick={(e) => deletePost(e, blog._id)}>
                    Delete Post
                  </button>
                )}
                <div className={styles.commentsContainer}>
                  {blog.comments.map((comment, index) => (
                    <div key={index} className={styles.commentContainer}>
                      <p>{comment.message}</p>
                      {authenticated && (
                        <button
                          onClick={(e) =>
                            deleteComment(e, comment._id, blog._id)
                          }
                        >
                          Delete Comment
                        </button>
                      )}
                    </div>
                  ))}
                  <form onSubmit={(e) => addComment(e, blog._id)}>
                    <input
                      type="text"
                      name="comment"
                      placeholder="Add Comment"
                    />
                    <button type="submit">add comment</button>
                  </form>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

export default Blogs;
