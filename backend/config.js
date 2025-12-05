import dotenv from 'dotenv';

dotenv.config();

// Read MongoDB connection from environment first, fallback to the original string
export const mongoURL = process.env.MONGO_URI || "mongodb+srv://hadishamas41_db_user:Chamas_17@book-store-mern.ot7kxax.mongodb.net/books-collection?appName=Book-Store-Mern";
