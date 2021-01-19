import React, { useState, useEffect } from "react";
import {apiCalls} from '../../apiCalls';


const OrderForm = () => {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [order, setOrder] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrder({
      name: name,
      ingredients: ingredients
    })
    this.clearInputs();
  }

  const handleIngredientChange = (e) => {
    e.preventDefault();
    const isDuplicate = ingredients.find(ingredient => {
      return e.target.name === ingredient;
    })
    if(!isDuplicate) {
      setIngredients([...ingredients, e.target.name])
    }
  }

  const clearInputs = () => {
    setName('');
    setIngredients([])
  }

    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
}

export default OrderForm;
