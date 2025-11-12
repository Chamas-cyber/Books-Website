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
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);

        enqueueSnackbar("Book Deleted Successfully", {variant:"success"});
        navigate("/"); // go back to home after successful delete
      })
      .catch((err) => {   
        console.error("There was an error deleting the book!", err);
        setLoading(false);
        enqueueSnackbar("Error", {variant:"error"});

      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>{
         loading ? <Spinner /> : '' }
      <div className='flex flex-col border-2 border-red-400 rounded-xl w[600px]p-8 mx-auto'>
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