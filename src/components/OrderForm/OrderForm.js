import React, { useState } from "react";
import {apiCalls} from '../../apiCalls';


const OrderForm = ({getInfo}) => {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postTheOrder({
      name: name,
      ingredients: ingredients
    })
    clearInputs();
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const postTheOrder = (order) => {
    apiCalls.postOrder(order).then(() => {
      getInfo();
    });
  }

  const clearInputs = () => {
    setName('');
    setIngredients([]);
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
      <form data-testid="order-form-ele">
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={e => handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

        <button disabled={(!name || !ingredients.length) ? true : false} onClick={((e) =>  handleSubmit(e))}>
          Submit Order
        </button>
      </form>
    )
}

export default OrderForm;
