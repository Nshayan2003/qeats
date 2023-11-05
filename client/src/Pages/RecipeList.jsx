import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import Header from "../Header";

const RecipeList = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null); // Define the error state

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/recipes/search?query=${query}`);
        console.log(response.json());
        if (response.ok) {
          const data = await response.json();
          setRecipes(data.results);
        } else {
          console.error("Failed to retrieve recipes");
          setError("Failed to retrieve recipes. Please try again later.");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred. Please try again later.");
      }
    };

    fetchRecipes();
  }, [query]);

  return (
    <div>
      <Header />
      {error ? ( // Conditionally render the error message
        <div>Error: {error}</div>
      ) : (
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      )}
    </div>
  );
};

export default RecipeList;
