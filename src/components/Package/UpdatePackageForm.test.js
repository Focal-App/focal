import React from "react";
import UpdatePackageForm from "./UpdatePackageForm";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { DefaultText } from "utilities/api/dataAdapter";

describe("Update Package Form", () => {
  afterEach(cleanup);

  const initialValues = {
    package_name: DefaultText.nothing,
    upcoming_shoot_date: DefaultText.noContent,
    proposal_signed: true,
    package_contents: DefaultText.nothing,
    package_price: "1000.00",
    retainer_price: "0.00",
    retainer_paid_amount: "0.00",
    retainer_paid: false,
    discount_offered: "0.00",
    balance_remaining: "1000.00",
    balance_received: false,
    wedding_included: true,
    engagement_included: true,
  }

  const formComponent = <UpdatePackageForm initialValues={initialValues} setModalVisibility={jest.fn()} handleSubmit={jest.fn()} />


  it("renders with initial values", () => {
    const { getByLabelText } = render(formComponent);

    const packageName = getByLabelText("Package Name");
    expect(packageName.value).toBe("");

    const packageContents = getByLabelText("Package Contents");
    expect(packageContents.value).toBe("");

    const packagePrice = getByLabelText("Package Price");
    expect(packagePrice.value).toBe("1000.00");

    const discountOffered = getByLabelText("Discount Offered");
    expect(discountOffered.value).toBe("0.00");

    const retainerAmount = getByLabelText("Retainer Amount");
    expect(retainerAmount.value).toBe("0.00");

    const retainerPaidByClient = getByLabelText("Retainer Paid By Client");
    expect(retainerPaidByClient.value).toBe("0.00");

    const balanceRemaining = getByLabelText("Balance Remaining");
    expect(balanceRemaining.value).toBe("1000.00");

    const proposalSigned = getByLabelText("Client Has Signed Proposal");
    expect(proposalSigned.checked).toBe(true);

    const retainerPaid = getByLabelText("Client Has Paid Retainer");
    expect(retainerPaid.checked).toBe(false);

    const balanceReceived = getByLabelText("Client Has Paid Full Balance");
    expect(balanceReceived.checked).toBe(false);

    const engagementIncluded = getByLabelText("Includes Engagement Event");
    expect(engagementIncluded.checked).toBe(true);

    const weddingIncluded = getByLabelText("Includes Wedding Event");
    expect(weddingIncluded.checked).toBe(true);
  });


  it("package name is required", async () => {
    const { getByLabelText, findByText } = render(formComponent);

    const packageName = getByLabelText("Package Name");
    fireEvent.blur(packageName);
    await findByText('Package Name required');
  });

  it("package price must be more than 1", async () => {
    const { getByLabelText, findByText } = render(formComponent);

    const packagePrice = getByLabelText("Package Price");
    fireEvent.change(packagePrice, { target: { value: "0.99" } });
    fireEvent.blur(packagePrice);
    await findByText('Package Price must be at least 1');
  });

  it("cannot submit if package name is empty", async () => {
    const { getByText, findByText } = render(formComponent);

    fireEvent.click(getByText("Update Package"));
    await findByText('Package Name required');
  });

  it("can submit when no validation errors", async () => {
    const { getByLabelText, getByText, queryByText } = render(formComponent);

      const packageName = getByLabelText("Package Name");
      fireEvent.change(packageName, { target: { value: "Wedding Classic" } });
      fireEvent.click(getByText("Update Package"));
      const error = await queryByText('Package Name required');

      expect(error).toBeNull();
    });
});
