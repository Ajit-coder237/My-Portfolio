import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const Admin = () => {
  const [blogContent, setBlogContent] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Set up Axios to include the token in headers
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/blogs");
          setBlogs(response.data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };

      fetchBlogs();
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setIsAuthenticated(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
  };

  const handlePostBlog = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/blogs", {
        title: blogTitle,
        content: blogContent,
      });
      setBlogs([...blogs, response.data]);
      setBlogTitle("");
      setBlogContent("");
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  const handleEditBlog = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        {
          title: blogTitle,
          content: blogContent,
        }
      );
      setBlogs(blogs.map((blog) => (blog._id === id ? response.data : blog)));
      setEditingBlogId(null);
      setBlogTitle("");
      setBlogContent("");
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-[#2b2b2b] text-amber-100 p-8">
        <h2 className="text-3xl font-bold mb-6 terminal-text">
          &gt; Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-black/50 border-2 border-amber-600 text-amber-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-black/50 border-2 border-amber-600 text-amber-200"
        />
        <button
          onClick={handleLogin}
          className="mt-4 px-6 py-2 bg-amber-800 hover:bg-amber-700 transition border-2 border-amber-600"
        >
          LOGIN.exe
        </button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="bg-[#2b2b2b] text-amber-100 p-8">
      <h2 className="text-3xl font-bold mb-6 terminal-text">
        &gt; Admin Panel
      </h2>
      <button
        onClick={handleLogout}
        className="mb-4 px-6 py-2 bg-red-600 hover:bg-red-500 transition border-2 border-red-700"
      >
        LOGOUT.exe
      </button>
      <input
        type="text"
        placeholder="Blog Title"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        className="w-full p-2 mb-4 bg-black/50 border-2 border-amber-600 text-amber-200"
      />
      <CKEditor
        editor={ClassicEditor}
        data={blogContent}
        onChange={(event, editor) => {
          const data = editor.getData();
          setBlogContent(data);
        }}
      />
      <button
        onClick={
          editingBlogId ? () => handleEditBlog(editingBlogId) : handlePostBlog
        }
        className="mt-4 px-6 py-2 bg-amber-800 hover:bg-amber-700 transition border-2 border-amber-600"
      >
        {editingBlogId ? "EDIT_BLOG.exe" : "POST_BLOG.exe"}
      </button>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 terminal-text">
          &gt; Uploaded Blogs
        </h3>
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id} className="mb-4 border-b border-amber-600 pb-2">
              <h4 className="text-xl font-bold">{blog.title}</h4>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              <button
                onClick={() => {
                  setEditingBlogId(blog._id);
                  setBlogTitle(blog.title);
                  setBlogContent(blog.content);
                }}
                className="mr-2 text-amber-400 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBlog(blog._id)}
                className="text-red-400 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
