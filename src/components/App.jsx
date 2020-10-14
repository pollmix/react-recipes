import React from "react";
import RecipeList from "./RecipeList";
import "./../css/app.css";

function App() {
  return (
    <div className="App">
      <RecipeList recipes={sampleRecipes} />
    </div>
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
