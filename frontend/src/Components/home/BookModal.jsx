import { BiUserCircle } from "react-icons/bi";
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai"; // ✅ correct import (you had AiOutlineEdit before by mistake)

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center" // ✅ fixed bg-opacity typo
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[600px] max-h-[90vh] bg-white rounded-xl p-4 flex flex-col relative overflow-y-auto"
      >
        {/* ✅ fixed 'absolute' typo + import */}
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h2 className="inline-block px-3 py-1 bg-red-300 rounded-md text-sm">
          {new Date(book.publishedDate).getFullYear()}
        </h2>

        <h3 className="my-2 text-gray-500">{book._id}</h3>

        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>

        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
