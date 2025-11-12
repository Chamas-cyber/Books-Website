  import express from "express";
  import { Book } from "../models/bookModels.js";


  const router = express.Router();







  // Create a new book
  router.post("/", async (req, res) => {
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

  // Get all books
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // Get a book by ID
  router.get("/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // Update a book by ID
  router.put("/:id", async (req, res) => {
    try {
      const { title, author, publishedDate } = req.body;
      if (!title || !author || !publishedDate) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { title, author, publishedDate },
        { new: true, runValidators: true }
      );

      if (!updatedBook) return res.status(404).json({ message: "Book not found" });
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // Delete a book by ID
  router.delete("/:id", async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) return res.status(404).json({ message: "Book not found" });
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  export default router;
