import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Label } from "UI/FormParts";
import DataAdapter from 'utilities/api/dataAdapter';
import { WeddingEventSchema, EventSchema } from "./FormEventSchema";

const UpdateEventForm = ({ initialValues, setModalVisibility, handleSubmit, handleDelete }) => {
    const formReadyValues = DataAdapter.toFormReadyData(initialValues);
    const validationSchema = initialValues.event_name.match(/wedding/i) ? WeddingEventSchema : EventSchema;
    return (
        <Formik
            initialValues={formReadyValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                handleSubmit(values)
            }}
            render={({
                isSubmitting,
            }) => (
                    <Form className="update-client-information--container">
                        <h3>Event</h3>

                        <Label label={`Event Name`} name={'event_name'} />
                        <Field component="select" name={'event_name'} id={'event_name'} placeholder="Engagement">
                            <option value="Engagement">Engagement</option>
                            <option value="Wedding">Wedding</option>
                        </Field>
                        <ErrorMessage className='field-error' name={'event_name'} component="div" />

                        <Label label={`Shoot Date`} name={'shoot_date'} />
                        <Field type="date" name={'shoot_date'} id={'shoot_date'} />
                        <ErrorMessage className='field-error' name={'shoot_date'} component="div" />

                        <Label label={`Shoot Time`} name={'shoot_time'} />
                        <Field type="text" name={'shoot_time'} id={'shoot_time'} />
                        <ErrorMessage className='field-error' name={'shoot_time'} component="div" />

                        {initialValues.shoot_location ? (
                            <>
                                <Label label={`Shoot Location`} name={'shoot_location'} />
                                <Field type="text" name={'shoot_location'} id={'shoot_location'} />
                                <ErrorMessage className='field-error' name={'shoot_location'} component="div" />
                            </>
                        )
                            : (
                                <>
                                    <Label label={`Ceremony Location`} name={'wedding_location'} />
                                    <Field type="text" name={'wedding_location'} id={'wedding_location'} />
                                    <ErrorMessage className='field-error' name={'wedding_location'} component="div" />

                                    <Label label={`Reception Location`} name={'reception_location'} />
                                    <Field type="text" name={'reception_location'} id={'reception_location'} />
                                    <ErrorMessage className='field-error' name={'reception_location'} component="div" />

                                    <Label label={`Coordinator Name`} name={'coordinator_name'} />
                                    <Field type="text" name={'coordinator_name'} id={'coordinator_name'} />
                                    <ErrorMessage className='field-error' name={'coordinator_name'} component="div" />
                                </>
                            )
                        }

                        <hr />

                        <Label label={`Edit Image Deadline`} name={'edit_image_deadline'} />
                        <Field type="date" name={'edit_image_deadline'} id={'edit_image_deadline'} />
                        <ErrorMessage className='field-error' name={'edit_image_deadline'} component="div" />

                        <Label label={`Gallery Link`} name={'gallery_link'} />
                        <Field type="text" name={'gallery_link'} id={'gallery_link'} />
                        <ErrorMessage className='field-error' name={'gallery_link'} component="div" />

                        <Label label={`Blog Link`} name={'blog_link'} />
                        <Field type="text" name={'blog_link'} id={'blog_link'} />
                        <ErrorMessage className='field-error' name={'blog_link'} component="div" />

                        <hr />

                        <Label label={`Notes`} name={'notes'} />
                        <Field type="text" component="textarea" name={'notes'} id={'notes'} />
                        <ErrorMessage className='field-error' name={'notes'} component="div" />

                        <div className="btn-span--three">
                            <button className="btn-warning" onClick={() => handleDelete()}>
                                Delete
                            </button>
                            <button className="btn-tertiary" onClick={() => setModalVisibility(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                Update Event
                            </button>
                        </div>
                    </Form>
                )
            }
        />
    );
};

export default UpdateEventForm;