import * as Yup from 'yup';

const BaseEventSchema = {
    event_name: Yup.string()
        .required('Event Name required'),
    shoot_date: Yup.date()
        .notRequired()
        .nullable(),
    blog_link: Yup.string()
        .url()
        .nullable()
        .notRequired(),
    gallery_link: Yup.string()
        .url()
        .nullable()
        .notRequired(),
    notes: Yup.string()
        .nullable()
        .notRequired(),
    edit_image_deadline: Yup.date()
        .nullable()
        .notRequired(),
    shoot_time: Yup.string()
        .nullable()
        .notRequired(),
    shoot_location: Yup.string()
        .nullable()
        .notRequired(),
}

export const EventSchema = Yup.object().shape({
    ...BaseEventSchema, 
    shoot_location: Yup.string()
        .nullable()
        .notRequired(),
})

export const WeddingEventSchema = Yup.object().shape({
    ...BaseEventSchema, 
    reception_location: Yup.string()
        .nullable()
        .notRequired(),
    wedding_location: Yup.string()
        .nullable()
        .notRequired(),
    coordinator_name: Yup.string()
        .nullable()
        .notRequired(),
})