import React from "react";
import NewClientForm from "./NewClientForm";
import { cleanup, render, fireEvent } from "@testing-library/react";

describe("New Client Form", () => {
  afterEach(cleanup);

  it("renders with no initial values", () => {
    const { getByLabelText } = render(<NewClientForm />);

    const clientFirstName = getByLabelText("First Name");
    expect(clientFirstName.value).toBe("");

    const clientLastName = getByLabelText("Last Name");
    expect(clientLastName.value).toBe("");

    const email = getByLabelText("Email");
    expect(email.value).toBe("");

    const phoneNumber = getByLabelText("Phone Number");
    expect(phoneNumber.value).toBe("");

    const notes = getByLabelText("Private Notes");
    expect(notes.value).toBe("");
  });


  it("client first name is required", async () => {
    const { findByText, getByLabelText } = render(<NewClientForm />);

    const clientFirstName = getByLabelText("First Name");
    fireEvent.blur(clientFirstName);
    await findByText('First Name required');
  });

  it("cannot submit if client first name is empty", async () => {
    const mockSubmit = jest.fn();
    const { findByText, getByText } = render(<NewClientForm onSubmit={mockSubmit} />);

    fireEvent.click(getByText("Submit"));
    await findByText('First Name required');
    expect(mockSubmit.mock.calls.length).toBe(0);
  });

it("can submit when no validation errors", async () => {
    const mockSubmit = jest.fn();
    const { queryByText, getByText, getByLabelText } = render(<NewClientForm onSubmit={mockSubmit} />);
    const clientFirstName = getByLabelText("First Name");
    fireEvent.change(clientFirstName, { target: { value: "Sammy" } });
    fireEvent.click(getByText("Submit"));
    const error = await queryByText('First Name required');

    expect(error).toBeNull();
  });

});
