import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignupLoginScreen from "../src/screens/SignupLoginScreen";
import { AuthProvider } from "../src/context/AuthContext";

// Mock the navigation
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock the auth context
const mockAuthContext = {
  signUp: jest.fn(),
  signIn: jest.fn(),
  loading: false,
  error: null,
};

describe("SignupLoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <SignupLoginScreen navigation={mockNavigation} />
      </AuthProvider>
    );

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
  });

  it("handles sign in", async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <SignupLoginScreen navigation={mockNavigation} />
      </AuthProvider>
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const signInButton = getByText("Sign In");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockAuthContext.signIn).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  it("handles sign up", async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <SignupLoginScreen navigation={mockNavigation} />
      </AuthProvider>
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const signUpButton = getByText("Sign Up");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(mockAuthContext.signUp).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  it("shows error message when authentication fails", async () => {
    mockAuthContext.error = "Invalid credentials";
    const { getByText } = render(
      <AuthProvider>
        <SignupLoginScreen navigation={mockNavigation} />
      </AuthProvider>
    );

    expect(getByText("Invalid credentials")).toBeTruthy();
  });
});
