import { useState } from "react";

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    serves: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "serves" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Recipe:", formData);

    setFormData({
      title: "",
      ingredients: "",
      steps: "",
      serves: 1,
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Ingredients (comma-separated)</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Steps</label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Serves</label>
          <input
            type="number"
            name="serves"
            value={formData.serves}
            onChange={handleChange}
            min="1"
            className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition duration-300"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
