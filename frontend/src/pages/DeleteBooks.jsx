import React, {useState} from "react";
import BackButton from "../Components/BookButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";


const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", {variant:"success"});
        // After successful delete go to the main page
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 401) {
          // Only redirect to login if unauthorized
          enqueueSnackbar("Session expired. Please login again.", {variant:"error"});
          localStorage.removeItem('token');
          navigate("/");
        } else {
          console.error("There was an error deleting the book!", err);
          enqueueSnackbar("Error", {variant:"error"});
        }
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination="/home" />
      <h1 className='text-3xl my-4'>Delete Book</h1>{
         loading ? <Spinner /> : '' }
      <div className='w-full max-w-[600px] mx-auto flex flex-col border-2 border-red-400 rounded-xl p-8'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Delete Book
        </button>
      </div>
    </div>
  );
}
export default DeleteBooks;