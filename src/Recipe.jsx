import React from 'react';
import style from './recipe.module.css';

function Recipe({ title, calories, image, ingredients }) {
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <p>{calories}</p>
      <img className={style.image} src={image} alt=""></img>
      <ol>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ol>
    </div>
  );
}

export default Recipe;
