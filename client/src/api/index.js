import axios from 'axios';

//  from server/index.js
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
// PATCH instead of PUT - only updating one post
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);