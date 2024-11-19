import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connect, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Models
const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Blog = model("Blog", blogSchema);

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = model("Admin", adminSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables.");
  process.exit(1);
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Initialize Admin if not exists
const createAdminIfNotExists = async () => {
  const adminDetails = await Admin.find();
  if (adminDetails.length === 0) {
    const email = process.env.DEFAULT_ADMIN_EMAIL;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;

    if (!email || !password) {
      console.error(
        "Default admin credentials are missing in environment variables."
      );
      return;
    }

    try {
      const hash_password = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ email, password: hash_password });
      await newAdmin.save();
      console.log("Default admin created successfully");
    } catch (error) {
      console.error("Error creating default admin:", error);
    }
  }
};

createAdminIfNotExists();

// Routes
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

app.get("/admin/protected", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the protected admin route" });
});

app.get("/api/blogs", authenticateToken, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

app.post("/api/blogs", authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const newBlog = new Blog({ title, content });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Error saving blog" });
  }
});

app.put("/api/blogs/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog" });
  }
});

app.delete("/api/blogs/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
