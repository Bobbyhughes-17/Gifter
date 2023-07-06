import React, { useState, useContext } from "react";
import { PostContext } from "../providers/PostProvider";

const PostForm = () => {
  const { addPost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title: title,
      caption: caption,
    };

    addPost(newPost)
      .then(() => {
        setTitle("");
        setCaption("");
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="caption">Caption:</label>
          <textarea
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
