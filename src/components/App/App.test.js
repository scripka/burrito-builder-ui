import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import mockData from '../../TestData/_mockData';
import '@testing-library/jest-dom';
import { apiCalls } from "../../apiCalls.js";
import userEvent from '@testing-library/user-event';
import App from './App';
jest.mock("../../apiCalls");

describe("App", () => {

  beforeEach(() => {
    apiCalls.getOrders.mockResolvedValue(mockData[0]);
  });
  
  it("should render all elements of the recipe correctly", () => {
    render(<App />)

    expect(screen.getByText("Burrito Builder")).toBeInTheDocument();
    expect(screen.getByTestId("orders-element")).toBeInTheDocument();
    expect(screen.getByTestId("order-form-ele")).toBeInTheDocument();
    expect(screen.getByText("No orders yet!")).toBeInTheDocument();
  })

  it("should be able to display all existing orders", async() => {
    render(<App />)

    await waitFor (() => expect(screen.getByText("Sam")).toBeInTheDocument());
    await waitFor (() => expect(screen.getByText("eggs")).toBeInTheDocument());
    await waitFor (() => expect(screen.getByText("chicken")).toBeInTheDocument());
    await waitFor (() => expect(screen.getByText("tomato")).toBeInTheDocument());
    await waitFor (() => expect(screen.getByText("potatoes")).toBeInTheDocument());
    await waitFor (() => expect(screen.getByText("Pat")).toBeInTheDocument());
  })

  it("should be able to submit an order and display it", async() => {
    const orderToPost = mockData[2];
    const newOrders = mockData[3];

    apiCalls.postOrder.mockResolvedValue(orderToPost.orderToPost);
    apiCalls.getOrders.mockResolvedValue(newOrders);

    render(<App />)

    const submitButton = screen.getByText("Submit Order");
    const userClick = screen.getByRole("button", {name: "beans"});
    const userInput = screen.getByPlaceholderText("Name");

    await waitFor (() => expect(screen.getByText("Sam")).toBeInTheDocument());
    await waitFor (() => expect(screen.getByText("eggs")).toBeInTheDocument());

    userEvent.click(userClick);
    expect(submitButton).toBeDisabled();

    userEvent.type(userInput, 'Olga')
    expect(submitButton).not.toBeDisabled();

    userEvent.click(submitButton)
    expect(apiCalls.postOrder).toHaveBeenCalledTimes(1)

    await waitFor (() => expect(screen.getByText("Olga")).toBeInTheDocument());
    await waitFor (() => expect(screen.getAllByText("beans")).toHaveLength(2));
  })
})
