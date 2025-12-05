import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../Components/BookButton";
import Spinner from "../Components/Spinner.jsx";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const { id } = useParams(); // get book ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(""); // frontend state
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  // Fetch book data on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishedDate); // map backend field to frontend state
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setLoading(false);
      });
  }, [id]);

  const handleEditBook = () => {
    // Prepare data object matching backend
    const data = {
      title,
      author,
      publishedDate: publishYear, // must match backend
    };

    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited Successfully", {variant:"success"});
        // After successful edit go to the main page
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 401) {
          enqueueSnackbar("Session expired. Please login again.", {variant:"error"});
          localStorage.removeItem('token');
          navigate("/");
        } else {
          console.error("There was an error editing the book!", err);
          enqueueSnackbar("Error",{variant:"error"});
        }
      });
  };

  return (
    <div className="p-4">
      <BackButton destination="/home" />
      <h1 className="text-3xl my-4">Edit Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-[600px] mx-auto border-2 border-sky-400 rounded-xl p-4">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Published Date:</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <button
            className="p-2 bg-sky-300 m-8 w-full md:w-auto rounded-lg hover:bg-sky-500"
            onClick={handleEditBook}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
