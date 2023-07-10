import { useState } from "react";
import { addPost, searchPosts } from "../APIManagers/PostManager";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export const PostForm = () => {
  const [newPost, update] = useState({
    title: "",
    imageUrl: "",
    caption: "",
    userProfileId: 1,
    dateCreated: Date.now(),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    const postToSendToAPI = {
      Title: newPost.title,
      Caption: newPost.caption,
      ImageUrl: newPost.imageUrl,
      DateCreated: new Date().toISOString(),
      UserProfileId: 1,
    };

    addPost(postToSendToAPI)
      .then(() => {
        update({
          title: "",
          imageUrl: "",
          caption: "",
          userProfileId: 1,
          dateCreated: Date.now(),
        });

        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = (event) => {
    event.preventDefault();

    searchPosts(searchQuery)
      .then((response) => {
        setSearchResults(response);
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });
  };

  return (
    <div>
      <Form className="post-form">
        <h2 className="post-form-title">Create a New Post</h2>
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input
            type="text"
            id="title"
            value={newPost.title}
            onChange={(event) => {
              const copy = { ...newPost };
              copy.title = event.target.value;
              update(copy);
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for="caption">Caption:</Label>
          <Input
            type="text"
            id="caption"
            value={newPost.caption}
            onChange={(event) => {
              const copy = { ...newPost };
              copy.caption = event.target.value;
              update(copy);
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for="imageUrl">Image Url:</Label>
          <Input
            type="text"
            id="imageUrl"
            value={newPost.imageUrl}
            onChange={(event) => {
              const copy = { ...newPost };
              copy.imageUrl = event.target.value;
              update(copy);
            }}
          />
        </FormGroup>

        <Button onClick={handleSaveButtonClick} color="primary">
          Submit Post
        </Button>
      </Form>
      <Form className="post-form">
        <FormGroup>
          <Label for="searchQuery">Search:</Label>
          <Input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </FormGroup>

        <Button onClick={handleSearchButtonClick} color="primary">
          Search
        </Button>
      </Form>
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((post) => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <p>Caption: {post.caption}</p>
                <img src={post.imageUrl} alt={post.title} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
