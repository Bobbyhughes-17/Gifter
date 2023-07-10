import React from "react";
import "./App.css";
import PostList from "./components/PostList";
import { PostForm } from "./components/PostForm";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <PostForm />
        <PostList />
    </div>
    </BrowserRouter>
  );
}

export default App;