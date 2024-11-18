import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connect, Schema, model } from "mongoose";

connect("mongodb://localhost:27017/myportfolio");

const blogSchema = new Schema({
  title: String,
  content: String,
});

const Blog = model("Blog", blogSchema);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

app.post("/api/blogs", async (req, res) => {
  const { title, content } = req.body;
  const newBlog = new Blog({ title, content });
  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Error saving blog" });
  }
});

app.put("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog" });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
