import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateBooks from "./pages/CreateBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import DeleteBooks from "./pages/DeleteBooks.jsx";
import ShowBook from "./pages/ShowBook.jsx";

const App = () => {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Home />} />

      {/* Book-related routes */}
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBooks />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
    </Routes>
  );
};

export default App;
