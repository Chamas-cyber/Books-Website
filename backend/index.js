  import express from "express";
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  import { mongoURL } from "./config.js";
  import { Book } from "./models/bookModels.js";
  import bookRoutes from "./routes/booksroute.js";
  import authRoutes from "./routes/auth.js";
  import cors from 'cors';

  dotenv.config();

  const app = express();
  app.use(
    cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
  })
  );
  app.use(express.json());
  app.use('/books', bookRoutes);
  app.use('/auth', authRoutes);
  // ✅ Connect to MongoDB
  mongoose
    .connect(mongoURL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

  // ✅ Test route
  app.get("/", (req, res) => {
    res.send("Backend server is running ✅");
  });

  // ✅ Create a new book
  app.post("/books", async (req, res) => {
    try {
      const { title, author, publishedDate } = req.body;
      if (!title || !author || !publishedDate) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newBook = await Book.create({ title, author, publishedDate });
      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // ✅ Get all books
  app.get("/books", async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // ✅ Get a book by ID
  app.get("/books/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // ✅ Update a book by ID
  app.put("/books/:id", async (req, res) => {
    try {
      const { title, author, publishedDate } = req.body;
      const book = await Book.findByIdAndUpdate(
        req.params.id,
        { title, author, publishedDate },
        { new: true, runValidators: true }
      );

      if (!book) return res.status(404).json({ message: "Book not found" });
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // ✅ Delete a book by ID
  app.delete("/books/:id", async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  app.put('/books/:id', async (req, res) => {
    try {
      if(
        !req.body.title ||
        !req.body.author ||
        !req.body.publishedDate
      ){
        return res.status(400).json({ message: "All fields are required" });
      }
      const {id} = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
      if(!result){
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book updated successfully" });

    }catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  app.delete('/books/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const result = await Book.findByIdAndDelete(id);
      if(!result){
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book deleted successfully" });

    }catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  


  // ✅ Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
