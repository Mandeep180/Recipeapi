import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import './App.css';

function App() {

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;
  //  const APP_ID=88dfcfd3;
  //  const APP_KEY=a0c678ffa0c1cd90407536188745cfcb;

  const [recipes, setRecipes] = useState([]);
  //for search bar
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }


  //Onchange event for search
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  //declaring current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      <h1 className="heading">RecipeAPI</h1>
      <p className="container">This Edamam recipe API has the data of tens of thousands of foods, including international dishes.
        Enter ANY sort of food (e.g.: pasta, chicken enchilada, dumpling, etc.) to see its magic.</p>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          search
        </button>
      </form>
      <h4 className="heading">*Note this API allows only 10 search per minute</h4>
      <div className="recipes">
        {recipes && recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients} />

        ))}
      </div>
      <h4 className="heading">© {currentYear} Mandeep Kaur: Thanks for visiting my page</h4>
    </div>
  );
}

export default App;
