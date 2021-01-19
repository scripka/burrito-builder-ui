import React from 'react';
import { screen, render } from '@testing-library/react';
import mockData from '../../TestData/_mockData';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import OrderForm from './OrderForm';

describe("OrderFomr", () => {
  
  it("should render all elements of the recipe correctly", () => {
    render(<OrderForm
      getInfo={jest.fn()}
      />, { wrapper: MemoryRouter });

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(13);
    expect(screen.getByRole("button", {name: "Submit Order"})).toBeInTheDocument();
    expect(screen.getByText("Order: Nothing selected")).toBeInTheDocument();
  })

  it("should render all buttons with ingredients", () => {
    render(<OrderForm
      getInfo={jest.fn()}
      />, { wrapper: MemoryRouter });
    
      mockData[1].ingredients.map(ingredient => {
        expect(screen.getByRole("button", {name: ingredient})).toBeInTheDocument()
      })
  })

  it("User types inside the name input area", () => {
    render(<OrderForm
      getInfo={jest.fn()}
      />, { wrapper: MemoryRouter });
    
    const userInput = screen.getByPlaceholderText("Name");
    userEvent.type(userInput, 'Unicorn');

    expect(userInput).toHaveValue('Unicorn')
  })

  it("user can click on ingredients to display on the screen", () => {
    render(<OrderForm
      getInfo={jest.fn()}
      />, { wrapper: MemoryRouter });
    
    const userClick = screen.getByText("beans");
    userEvent.click(userClick);

    expect(screen.getByText("Order: beans")).toBeInTheDocument();
  })

  it("should disable button if no name or ingredients and enabled if both exist", () => {
    render(<OrderForm
      getInfo={jest.fn()}
      />, { wrapper: MemoryRouter });
      
    const submitButton = screen.getByText("Submit Order");
    const userClick = screen.getByText("beans");
    userEvent.click(userClick);

    expect(submitButton).toBeDisabled();

    const userInput = screen.getByPlaceholderText("Name");
    userEvent.type(userInput, 'Unicorn');

    expect(submitButton).not.toBeDisabled();
  })
})