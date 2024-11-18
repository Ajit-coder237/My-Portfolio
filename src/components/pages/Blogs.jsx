import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import Header from "./Header";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Header />
      <section id="blog" className="bg-[#2b2b2b] text-amber-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 terminal-text">
            &gt; Blogs_
          </h2>
          {blogs.map((blog) => (
            <div key={blog.id} className="mb-8">
              <h3 className="text-xl font-bold mb-2">&gt; {blog.title}</h3>
              <div
                className="text-amber-200"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
