import React from 'react';
import { Formik, Form } from 'formik';
import { FieldWithError, DropdownFieldWithError } from "UI/FormParts";
import DataAdapter from 'utilities/api/dataAdapter';
import { WeddingEventSchema, EventSchema } from "./FormEventSchema";

const UpdateEventForm = ({ initialValues, setModalVisibility, handleSubmit, handleDelete, newEvent }) => {
    const formReadyValues = DataAdapter.toFormReadyData(initialValues);
    const validationSchema = initialValues.event_name.match(/wedding/i) ? WeddingEventSchema : EventSchema;
    return (
        <Formik
            initialValues={formReadyValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
            render={({
                isSubmitting,
            }) => (
                    <Form className="update-client-information--container">
                        <h3>Event</h3>

                        <DropdownFieldWithError label={`Event Name`} name={'event_name'} >
                            {
                                initialValues.event_name.match(/wedding/i)
                                    ? <option value="Wedding">Wedding</option>
                                    : <option value="Engagement">Engagement</option>
                            }
                        </DropdownFieldWithError>

                        <FieldWithError label={`Shoot Date`} name={'shoot_date'} type="date" />
                        <FieldWithError label={`Shoot Time`} name={'shoot_time'} type="text" />
                        {
                            initialValues.shoot_location
                                ? <AdditionalDefaultEventFields />
                                : <AdditionalWeddingEventFields />
                        }
                        <hr />
                        <FieldWithError label={`Edit Image Deadline`} name={'edit_image_deadline'} type="date" />
                        <FieldWithError label={`Gallery Link`} name={'gallery_link'} type="text" />
                        <FieldWithError label={`Blog Link`} name={'blog_link'} type="text" />
                        <hr />
                        <FieldWithError label={`Notes`} name={'notes'} type="text" component="textarea" />
                        <div className="btn-span--three">
                            <button className="btn-warning" onClick={() => handleDelete()}>
                                Delete
                            </button>
                            <button className="btn-tertiary" onClick={() => setModalVisibility(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                {newEvent ? 'Create Event' : 'Update Event'}
                            </button>
                        </div>
                    </Form>
                )
            }
        />
    );
};

export default UpdateEventForm;

const AdditionalDefaultEventFields = () => (
    <FieldWithError label={`Shoot Location`} name={'shoot_location'} type="text" />
)

const AdditionalWeddingEventFields = () => (
    <>
        <FieldWithError label={`Ceremony Location`} name={'wedding_location'} type="text" />
        <FieldWithError label={`Reception Location`} name={'reception_location'} type="text" />
        <FieldWithError label={`Coordinator Name`} name={'coordinator_name'} type="text" />
    </>
)