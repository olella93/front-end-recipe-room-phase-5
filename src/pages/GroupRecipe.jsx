function GroupRecipe() {
  
  const recipes = [
    { id: 1, name: "Pasta", cuisine: "Italian" },
    { id: 2, name: "Tacos", cuisine: "Mexican" },
    { id: 3, name: "Curry", cuisine: "Indian" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Group Recipes</h1>
      
      <ul className="space-y-2">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="p-2 border rounded">
            <h3 className="font-medium">{recipe.name}</h3>
            <p className="text-sm text-gray-600">{recipe.cuisine} cuisine</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupRecipe;