import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../services/postService";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";

export default function PostForm({
  posts,
  setPosts,
  editingPost,
  setEditingPost,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingPost) {
      editPost();
    } else {
      addPost();
    }

    setTitle("");
    setBody("");
    setEditingPost(null);
  };

  const addPost = () => {
    createPost({ title, body })
      .then((response) => {
        setPosts([...posts, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPost = () => {
    updatePost(editingPost.id, { title, body })
      .then((response) => {
        setPosts(
          posts.map((post) =>
            post.id === editingPost.id ? response.data : post
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Title</div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div>Body</div>
      <textarea
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div>
        <button type="submit">{editingPost ? "Edit Post" : "Add Post"}</button>
      </div>
    </form>
  );
}
