import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe(" App Counter", () => {
  test("Counter Elements should be present", () => {
    render(<App />);
    const incrementButton = screen.getByText(/Increment/i);
    const decrementButton = screen.getByText(/Decrement/i);
    const counterLabel = screen.getByText(/Counter:/i);
    const counterText = screen.getByTestId("counter-value");

    expect(incrementButton).toBeInTheDocument();
    expect(incrementButton).toBeEnabled();
    expect(decrementButton).toBeInTheDocument();
    expect(decrementButton).toBeDisabled();
    expect(counterLabel).toBeInTheDocument();
    expect(counterText).toHaveTextContent(0);
  });

  test("Increment increases value by 1 and enables decrement button present", () => {
    render(<App />);
    const incrementButton = screen.getByText(/Increment/i);
    const decrementButton = screen.getByText(/Decrement/i);
    const counterText = screen.getByTestId("counter-value");

    expect(counterText).toHaveTextContent(0);
    userEvent.click(incrementButton);
    expect(counterText).toHaveTextContent(1);
    // expect(decrementButton).not.toBeDisabled()
    expect(decrementButton).toBeEnabled();
  });

  test("Decrement decreases value by 1 and disables increment button ", () => {
    render(<App />);
    const incrementButton = screen.getByText(/Increment/i);
    const decrementButton = screen.getByText(/Decrement/i);
    const counterText = screen.getByTestId("counter-value");

    expect(counterText).toHaveTextContent(0);
    userEvent.click(incrementButton);
    expect(counterText).toHaveTextContent(1);
    expect(decrementButton).toBeEnabled();
    userEvent.click(decrementButton);
    expect(counterText).toHaveTextContent(0);
    expect(decrementButton).toBeDisabled();
  });
});

describe("App Item List", () => {
  test("List Form components render", () => {
    render(<App />);
    const listItemInput = screen.getByLabelText(/Create List Item/i);
    const addItemButton = screen.getByTestId("add-item");

    expect(listItemInput).toBeInTheDocument();
    expect(addItemButton).toBeInTheDocument();
  });

  test("User can add item to page", () => {
    render(<App />);
    const listItemInput = screen.getByLabelText(/Create List Item/i);
    const addItemButton = screen.getByTestId("add-item");

    expect(listItemInput).toHaveValue("");
    userEvent.type(listItemInput, "Hello");
    expect(listItemInput).toHaveValue("Hello");

    userEvent.click(addItemButton);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(listItemInput).toHaveValue("");
  });

  test("User can remove item from page ", () => {
    render(<App />);
    const listItemInput = screen.getByLabelText(/Create List Item/i);
    const addItemButton = screen.getByTestId("add-item");

    userEvent.type(listItemInput, "hello");
    userEvent.click(addItemButton);
    const newItem = screen.getByText("hello");
    expect(newItem).toBeInTheDocument();

    const removeButton = screen.getByTestId("remove-item0");
    userEvent.click(removeButton);
    expect(newItem).not.toBeInTheDocument();
  });
});
