import { render, screen, fireEvent, act } from "@testing-library/react";
import Register from "../pages/register";

describe("Register Component", () => {
  test("renders the registration form", () => {
    render(<Register />);
    expect(screen.getByText(/zarejestruj się/i)).toBeInTheDocument();
  });

  test("validates and submits the form", async () => {
    render(<Register />);

    const nameInput = screen.getByLabelText(/nazwa użytkownika/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/hasło/i);
    const submitButton = screen.getByRole("button", {
      name: /zarejestruj się/i,
    });

    // Simulate user input
    act(() => {
      fireEvent.change(nameInput, { target: { value: "TestUser" } });
      fireEvent.change(emailInput, {
        target: { value: "testuser@example.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    });

    // Simulate form submission
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Assert the result
    expect(
      await screen.findByText(
        /konto na wprowadzony adres mailowy jest już zarejestrowane/i,
      ),
    ).toBeInTheDocument();
  });

  test("shows error if user already exists", async () => {
    render(<Register />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", {
      name: /zarejestruj się/i,
    });

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "existinguser@example.com" },
      });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(
      await screen.findByText(
        /konto na wprowadzony adres mailowy jest już zarejestrowane/i,
      ),
    ).toBeInTheDocument();
  });
});
