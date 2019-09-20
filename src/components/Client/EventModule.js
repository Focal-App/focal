import React, { useState } from "react";
import DataAdapter from "utilities/APIHandler/dataAdapter";
import FormContainer from "components/UI/FormContainer";
import Modal from "components/UI/Modal";
import Success from "components/UI/Success";
import Endpoints from "utilities/apiEndpoint";
import Error from "components/UI/Error";
import UpdateEventForm from "./UpdateEventForm";

const EventModule = ({ event, apiHandler, setEvents, package_uuid }) => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisibility] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        const transformedValues = DataAdapter.toApiReadyClient(values);
        let response;
        if (transformedValues.hasOwnProperty('uuid')) {
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
                setModalVisibility(false);
                setSuccess(false)
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
        <div>
            {modalVisible && (
                <Modal loading={loading} setModalVisibility={setModalVisibility} title="">
                    <FormContainer>
                        {errors && <Error message={errors} />}
                        {success
                            ? <Success text="Success!" />
                            : <UpdateEventForm
                                initialValues={event}
                                setModalVisibility={setModalVisibility}
                                handleSubmit={handleSubmit} 
                                handleDelete={handleDelete}
                            />
                        }
                    </FormContainer>
                </Modal>
            )}
            <div className="client-page--header">
                <h1>{event_name} Event</h1>
                <button className="btn-tertiary" onClick={() => setModalVisibility(true)}>Edit</button>
            </div>
            <section className="event-information">
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
                    <h4 className="text">{notes}</h4>
                </span>
            </section>
        </div>
    )
}

export default EventModule;

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