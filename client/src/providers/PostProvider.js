import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    return fetch("/api/post")
      .then((res) => res.json())
      .then(setPosts);
  };

  const addPost = (post) => {
    return fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };
  console.log(posts);
  const searchPosts = (criterion, sortDescending) => {
    const url = `/api/post/search?q=${encodeURIComponent(
      criterion
    )}&sortDesc=${sortDescending}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  return (
    <PostContext.Provider value={{ posts, getAllPosts, addPost, searchPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};
