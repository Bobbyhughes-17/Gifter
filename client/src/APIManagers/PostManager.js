import React from "react";

const baseUrl = '/api/Post';
const commentUrl = '/api/Post/GetWithComments';

export const getAllPosts = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};

export const addPost = (singlePost) => { 
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singlePost),
  });
};

export const searchPosts = (query, sortDesc) => {
  const url = `/api/Post/search?q=${encodeURIComponent(query)}&sortDesc=${sortDesc || false}`;

  return fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error searching posts:", error);
    });
};

export const getAllPostsWithComments = () => {
  return fetch(`${baseUrl}/GetWithComments`) 
    .then((res) => res.json())
};

