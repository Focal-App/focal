import React, { useState } from "react";
import DataAdapter from "utilities/api/dataAdapter";
import Endpoints from "utilities/api/apiEndpoint";
import UpdateEventForm from "./UpdateEventForm";
import ModalForm from "UI/ModalForm";

const EventModule = ({ event, apiHandler, setEvents, package_uuid, newEvent = false }) => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisibility] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        const transformedValues = DataAdapter.toApiReadyClient(values);
        let response;
        if (transformedValues.hasOwnProperty('uuid') && transformedValues.uuid) {
            response = await apiHandler.put(Endpoints.updateEvent(event.uuid), transformedValues);
        } else {
            response = await apiHandler.post(Endpoints.createEvent(package_uuid), transformedValues);
        }
        const { data, errors } = response;
        setLoading(false);
        if (data) {
            const convertedData = data.map(event => DataAdapter.toEventModel(event))
            setEvents(convertedData);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setModalVisibility(false);
            }, 1000)
        } else {
            setErrors(errors);
        }
    }

    const handleDelete = async () => {
        setLoading(true);
        const { data, errors } = await apiHandler.delete(Endpoints.updateEvent(event.uuid));
        setLoading(false);
        if (data) {
            const convertedData = data.map(event => DataAdapter.toEventModel(event))
            setEvents(convertedData);
            setSuccess(true);
            setTimeout(() => {
                setModalVisibility(false);
                setSuccess(false)
            }, 1000)
        } else {
            setErrors(errors);
        }
    }

    return (
        <div>
            <ModalForm
                isLoading={loading}
                isVisible={modalVisible}
                setModalVisibility={setModalVisibility}
                errors={errors}
                success={success}
            >
                <UpdateEventForm
                    initialValues={event}
                    setModalVisibility={setModalVisibility}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                    newEvent={newEvent} 
                />
            </ModalForm>

            {
                newEvent
                    ? <NewSuggestedEvent setModalVisibility={setModalVisibility} event_name={event.event_name} />
                    : <ExistingEvent setModalVisibility={setModalVisibility} event={event} />
            }
        </div>
    )
}

export default EventModule;

const NewSuggestedEvent = ({ event_name, setModalVisibility }) => (
    <section className={`event-information--suggested`}>
        <button data-testid="edit-event-btn" className="btn-tertiary" onClick={() => setModalVisibility(true)}>Create {event_name} Event</button>
    </section>
)

const ExistingEvent = ({ event, setModalVisibility }) => {
    const {
        blog_link,
        edit_image_deadline,
        event_name,
        gallery_link,
        notes,
        shoot_date,
        shoot_time,
        shoot_location
    } = event;
    return (
        <>
            <div className="client-page--header">
                <h1>{event_name} Event</h1>
                <button data-testid="edit-event-btn" className="btn-tertiary" onClick={() => setModalVisibility(true)}>Edit</button>
            </div>

            <section className={`event-information`}>
                <div>
                    <h6 className="label">{event_name} Shoot Date</h6>
                    <h4 className="text">{shoot_date}</h4>

                    <h6 className="label">{event_name} Shoot Time</h6>
                    <h4 className="text">{shoot_time}</h4>

                    {shoot_location && (
                        <>
                            <h6 className="label">{event_name} Shoot Location</h6>
                            <h4 className="text">{shoot_location}</h4>
                        </>
                    )}
                </div>
                {event_name.match(/wedding/i) && <WeddingEventInfo event={event} />}
                <hr />
                <div>
                    <h6 className="label">{event_name} Gallery Link</h6>
                    <h4 className="text">{gallery_link}</h4>
                </div>
                <div>
                    <h6 className="label">{event_name} Blog Link</h6>
                    <h4 className="text">{blog_link}</h4>
                </div>
                <div>
                    <h6 className="label">{event_name} Images Edit Deadline</h6>
                    <h4 className="text">{edit_image_deadline}</h4>
                </div>
                <hr />
                <span>
                    <h6 className="label">{event_name} Notes</h6>
                    <h4 className="text multiline">{notes}</h4>
                </span>
            </section>
        </>
    )
}

const WeddingEventInfo = ({ event }) => {
    const {
        coordinator_name,
        event_name,
        reception_location,
        wedding_location,
    } = event;
    return (
        <div>
            <h6 className="label">Ceremony Location</h6>
            <h4 className="text">{wedding_location}</h4>

            <h6 className="label">Reception Location</h6>
            <h4 className="text">{reception_location}</h4>

            <h6 className="label">{event_name} Coordinator</h6>
            <h4 className="text">{coordinator_name}</h4>
        </div>
    )
}
