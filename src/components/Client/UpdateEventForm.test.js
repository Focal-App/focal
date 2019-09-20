import React from "react";
import UpdateEventForm from "./UpdateEventForm";
import { cleanup, render, fireEvent } from "@testing-library/react";
import MockApiData from "utilities/APIHandler/mockApiData";

describe("Update Event Form", () => {
  afterEach(cleanup);

  const initialEventValues = MockApiData.eventData()
  const initialWeddingEventValues = MockApiData.weddingEventData()

  const engagementForm = <UpdateEventForm initialValues={initialEventValues} setModalVisibility={jest.fn()} handleSubmit={jest.fn()} />
  const weddingForm = <UpdateEventForm initialValues={initialWeddingEventValues} setModalVisibility={jest.fn()} handleSubmit={jest.fn()} />

  it("renders with initial event values", () => {
    const { getByLabelText } = render(engagementForm);

    const eventName = getByLabelText("Event Name");
    expect(eventName.value).toBe("Engagement");

    const shootDate = getByLabelText("Shoot Date");
    expect(shootDate.value).toBe("2020-04-17");

    const shootTime = getByLabelText("Shoot Time");
    expect(shootTime.value).toBe("6AM - 11AM");

    const shootLocation = getByLabelText("Shoot Location");
    expect(shootLocation.value).toBe("Los Angeles Poppy Fields");

    const editImageDeadline = getByLabelText("Edit Image Deadline");
    expect(editImageDeadline.value).toBe("2020-04-17");

    const galleryLink = getByLabelText("Gallery Link");
    expect(galleryLink.value).toBe("http://google.com");

    const blogLink = getByLabelText("Blog Link");
    expect(blogLink.value).toBe("http://google.com");

    const notes = getByLabelText("Notes");
    expect(notes.value).toBe("Have clients bring extra flowers and a see through chair.");
  });

  it("renders additional wedding fields for a wedding event", () => {
    const { getByLabelText } = render(weddingForm);

    const ceremonyLocation = getByLabelText("Ceremony Location");
    expect(ceremonyLocation.value).toBe("Viviana DTLA");

    const receptionLocation = getByLabelText("Reception Location");
    expect(receptionLocation.value).toBe("Redbird DTLA");

    const coordinatorName = getByLabelText("Coordinator Name");
    expect(coordinatorName.value).toBe("Cindy, 111-111-1111");

    const notes = getByLabelText("Notes");
    expect(notes.value).toBe("Coordinate with Cindy on exact time details for bride prep");
  });
});
