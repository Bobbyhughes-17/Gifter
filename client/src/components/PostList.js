import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  const { posts, getAllPosts, searchPosts } = useContext(PostContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDescending, setSortDescending] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleSearch = () => {
    searchPosts(searchTerm, sortDescending);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
            />
            <label>
              <input
                type="checkbox"
                checked={sortDescending}
                onChange={(e) => setSortDescending(e.target.checked)}
              />
              Sort Descending
            </label>
            <button onClick={handleSearch}>Search</button>
          </div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;

