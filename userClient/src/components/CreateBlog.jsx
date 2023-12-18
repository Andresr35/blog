import { useState } from "react";

const CreateBlog = () => {
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
      const response = await res.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={postBlog}>
        <label>
          Title
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
        <label>
          Message
          <input
            type="text"
            name="message"
            id="message"
            value={input.message}
            required
            onChange={(e) => setInput({ ...input, message: e.target.value })}
            placeholder="Enter Message"
          />
        </label>
        <button type="Submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
