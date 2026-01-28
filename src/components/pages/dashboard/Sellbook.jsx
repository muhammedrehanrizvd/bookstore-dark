import React from 'react'
import { useForm } from "react-hook-form";
import { addNewBook } from '../../../App/slices/BookSlice';
import { useDispatch , useSelector } from 'react-redux';
function Sellbook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const {isLoading}= useSelector(state=>state.book);

  // frontend-only submit (no backend yet)
  const onSubmit = async (data) => {
  try {
    await dispatch(addNewBook({
      title: data.title,
      author: data.author,
      price: data.price,
      description: data.description,
      genre: data.genre,
      file: data.file[0] // 👈 file object pass karna hai
    })).unwrap();

    alert("Book added successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to add book: " + error);
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Book Title
        </label>
        <input
          type="text"
          placeholder="Enter book title"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          {...register("title", {
            required: "Book title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Author Name
        </label>
        <input
          type="text"
          placeholder="Enter author name"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          {...register("author", {
            required: "Author name is required",
          })}
        />
        {errors.author && (
          <p className="text-sm text-red-500 mt-1">{errors.author.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (₹)
        </label>
        <input
          type="number"
          placeholder="Enter price"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            validate: (value) =>
              value > 0 || "Price must be greater than 0",
          })}
        />
        {errors.price && (
          <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Genre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre
        </label>
        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
          {...register("genre", {
            required: "Please select a genre",
          })}
        >
          <option value="">Select genre</option>
          <option value="Islamic">Islamic</option>
          <option value="Business">Business</option>
          <option value="History">History</option>
          <option value="Technology">Technology</option>
          <option value="Self-Help">Self Help</option>
        </select>
        {errors.genre && (
          <p className="text-sm text-red-500 mt-1">{errors.genre.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows="4"
          placeholder="Write a short description about the book"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 resize-none"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 20,
              message: "Description must be at least 20 characters",
            },
          })}
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Image
        </label>

        <input
          type="file"
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
          {...register("file", {
            required: "Cover image is required",
            validate: {
              fileType: (files) =>
                ["image/jpeg", "image/png", "image/jpg"].includes(
                  files[0]?.type
                ) || "Only JPG or PNG images allowed",
              fileSize: (files) =>
                files[0]?.size <= 5 * 1024 * 1024 ||
                "Image must be less than 5MB",
            },
          })}
        />
        {errors.file && (
          <p className="text-sm text-red-500 mt-1">{errors.file.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white
                   font-semibold py-3 rounded-lg transition shadow-md"
      >
        {isLoading?'proceeding...':'Add to Sell'}
      </button>
    </form>
  );
}

export default Sellbook
