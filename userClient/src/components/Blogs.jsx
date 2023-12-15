import { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch(`/api/post`, {})
      //   .then((res) => {
      //     return res.json();
      //   })
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>these are blogs</div>;
};

export default Blogs;
