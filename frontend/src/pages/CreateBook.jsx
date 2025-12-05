import React, { useState } from "react";
import BackButton from "../Components/BookButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner.jsx";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishedDate: publishYear,
    };

    setLoading(true);
    axios
      .post("http://localhost:5000/books/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
        // After successful create go to the main page
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          enqueueSnackbar("Session expired. Please login again.", { variant: "error" });
          localStorage.removeItem('token');
          navigate("/");
        } else {
          console.error("There was an error creating the book!", error);
          enqueueSnackbar("Error creating book", { variant: "error" });
        }
      });
  };

  return (
    <div className="p-4">
      <BackButton destination="/home" />
      <h1 className="text-3xl my-4">Create Book</h1>

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
            <label className="text-xl mr-4 text-gray-500">
              Published Year:
            </label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <button
            className="p-2 bg-sky-300 m-8 rounded-lg hover:bg-sky-500 w-full md:w-auto"
            onClick={handleSaveBook}
          >
            Save Book
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBooks;
