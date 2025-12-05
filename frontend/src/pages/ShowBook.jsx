import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../Components/BookButton";
import Spinner from "../Components/Spinner.jsx";

const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then((response) => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          // Only redirect to login if unauthorized
          localStorage.removeItem('token');
          window.location.href = "/";
        } else {
          console.error("There was an error fetching the book!", error);
        }
      });
  }, [id]); // ✅ close useEffect here

  // Ensure browser Back button from this page always goes to /home
  useEffect(() => {
    // Push a new history entry so Back triggers a popstate while on this page
    try {
      window.history.pushState({ fromShow: true }, "");
    } catch (e) {
      // ignore (some browsers may restrict)
    }

    const onPop = (e) => {
      navigate("/home");
    };

    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
    };
  }, [navigate]);

  return (
    <div className="p-4">
      <BackButton destination="/home" />
      <h1 className="text-3xl my-4">Show Book</h1>

      {loading ? (
        <Spinner />
      ) : book ? (
        <div className="w-full max-w-[600px] mx-auto flex flex-col border-2 border-sky-400 rounded-xl p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id:</span>
            <span>{book._id}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title:</span>
            <span>{book.title}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author:</span>
            <span>{book.author}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Published Year:</span>
            <span>{book.publishYear}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created At:</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Updated At:</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      ) : (
        <p>No book found.</p>
      )}
    </div>
  );
};

export default ShowBook;
