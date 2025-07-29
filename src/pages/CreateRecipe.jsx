import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../features/recipes/recipesSlice";
import { FiUploadCloud } from "react-icons/fi";
import { MdFastfood, MdOutlineDescription, MdOutlinePlace, MdGroups, MdImage } from "react-icons/md";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.recipes);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    country: "",
    serving_size: 1,
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "serving_size" ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create recipes!");
      return;
    }
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (imageFile) data.append("image", imageFile);
      await dispatch(createRecipe(data)).unwrap();
      alert("Recipe created successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to create recipe.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
      <h2 className="text-3xl font-extrabold text-orange-500 mb-6 text-center">🍽 Add New Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {/* Title */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <MdFastfood className="text-orange-400" />
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. Chicken Pilau"
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <MdOutlineDescription className="text-orange-400" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="2"
            placeholder="Short overview of the recipe..."
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Ingredients (comma-separated)</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            rows="3"
            placeholder="e.g. rice, chicken, spices, onions..."
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Step-by-step guide..."
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Country */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <MdOutlinePlace className="text-orange-400" />
            Country of Origin
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="e.g. Kenya"
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Serving Size */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <MdGroups className="text-orange-400" />
            Serving Size
          </label>
          <input
            type="number"
            name="serving_size"
            value={formData.serving_size}
            onChange={handleChange}
            min="1"
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
            <MdImage className="text-orange-400" />
            Upload Recipe Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-xl p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {imageFile && (
              <span className="text-sm text-gray-500 truncate max-w-xs">{imageFile.name}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-xl hover:bg-orange-600 transition duration-300"
          disabled={loading}
        >
          <FiUploadCloud size={20} />
          {loading ? "Submitting..." : "Submit Recipe"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
