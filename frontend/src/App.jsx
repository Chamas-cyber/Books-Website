import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateBooks from "./pages/CreateBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import DeleteBooks from "./pages/DeleteBooks.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <Routes>
      {/* Login page (public) */}
      <Route path="/" element={<Login />} />

      {/* Home page (protected) */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Book-related routes (protected) */}
      <Route
        path="/books/create"
        element={
          <ProtectedRoute>
            <CreateBooks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/edit/:id"
        element={
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/delete/:id"
        element={
          <ProtectedRoute>
            <DeleteBooks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/details/:id"
        element={
          <ProtectedRoute>
            <ShowBook />
          </ProtectedRoute>
        }
      />

      {/* Auth (public) */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
