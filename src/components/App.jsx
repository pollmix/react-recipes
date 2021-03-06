import React, { useState, createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import "./../css/app.css";

export const RecipeContext = createContext();
const LOCAL_STORAGE_KEY = "react-recipe.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );
  // this will tun only one time
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) {
      setRecipes(JSON.parse(recipeJSON));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValues = {
    handleAddRecipe,
    handleDeleteRecipe,
    handleSelectRecipe,
    handleUpdateRecipe,
  };

  function handleAddRecipe(params) {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
    };

    setSelectedRecipeId(newRecipe.id);

    setRecipes([newRecipe, ...recipes]);
  }

  function handleDeleteRecipe(id) {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  function handleSelectRecipe(id) {
    setSelectedRecipeId(id);
  }

  function handleUpdateRecipe(id, recipe) {
    // don't update a state directly without using the associated setState
    const tempRecipes = [...recipes];
    const index = tempRecipes.findIndex((r) => r.id === id);
    tempRecipes[index] = recipe;
    setRecipes(tempRecipes);
  }

  return (
    <RecipeContext.Provider value={recipeContextValues}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Beef",
    servings: 5,
    cookTime: "0:45",
    instructions: "1. Put paprika on beef\n2. Put beef in oven\n3. Eat beef",
    ingredients: [
      {
        id: 1,
        name: "Beef",
        amount: "3 Pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
];

export default App;
