import React from "react";
import UpdateClientForm from "./UpdateClientForm";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { DefaultText } from "utilities/APIHandler/dataAdapter";

describe("Update Client Form", () => {
  afterEach(cleanup);

  const initialValues = {
    contacts: [{
      first_name: "Tammy",
      last_name: "Tan",
      email: "tammy@gmail.com",
      phone_number: DefaultText.noContent,
      label: "Bride",
      best_time_to_contact: DefaultText.noContent,
    },
    {
      first_name: DefaultText.noContent,
      last_name: DefaultText.noContent,
      email: DefaultText.noContent,
      phone_number: DefaultText.noContent,
      label: DefaultText.noContent,
      best_time_to_contact: DefaultText.noContent,
    }],
    private_notes: "Looking for a wedding and engagement package"
  }

  const formComponent = <UpdateClientForm initialValues={initialValues} setModalVisibility={jest.fn()} handleSubmit={jest.fn()} />

  it("renders with initial values", () => {
    const { getByLabelText } = render(formComponent);

    const firstName = getByLabelText("Bride First Name");
    expect(firstName.value).toBe("Tammy");

    const lastName = getByLabelText("Bride Last Name");
    expect(lastName.value).toBe("Tan");

    const email = getByLabelText("Bride Email");
    expect(email.value).toBe("tammy@gmail.com");

    const phoneNumber = getByLabelText("Bride Phone Number");
    expect(phoneNumber.value).toBe("-");

    const label = getByLabelText("Bride Label");
    expect(label.value).toBe("Bride");

    const bestTimeToContact = getByLabelText("Bride Best Time To Contact");
    expect(bestTimeToContact.value).toBe("-");

    const privateNotes = getByLabelText("Private Notes");
    expect(privateNotes.value).toBe("Looking for a wedding and engagement package");

    getByLabelText("Partner First Name");
    getByLabelText("Partner Last Name");
    getByLabelText("Partner Email");
    getByLabelText("Partner Phone Number");
    getByLabelText("Partner Label");
    getByLabelText("Partner Best Time To Contact");
  });


  it("first name is required", async () => {
    const { getByLabelText, findByText } = render(formComponent);

    const firstName = getByLabelText("Bride First Name");
    fireEvent.change(firstName, { target: { value: "" } });
    fireEvent.blur(firstName);
    await findByText('First Name required');
  });

  it("can submit when no validation errors", async () => {
    const { getByText, queryByText } = render(formComponent);

    fireEvent.click(getByText("Update Client"));
    const error = await queryByText('First Name required');
    expect(error).toBeNull();
  });
});
