import React from "react";
import DataAdapter from "utilities/APIHandler/dataAdapter";

const EventInformation = ({ events, apiHandler, setEvents, eventPackage }) => {
    if (events && events.length >= 1) {
        return (
            <section className="client-events--container">
                {events.map(event => <EventModule event={event} />)}
            </section>
        )
    } else if (eventPackage.wedding_included || eventPackage.engagement_included) {
        let eventModules = [];
        if (eventPackage.engagement_included) {
            const intiialEventData = DataAdapter.toEventModel(null, "event");
            eventModules.push(<EventModule key="engagement" event={intiialEventData} />)
        }
        if (eventPackage.wedding_included) {
            const intiialWeddingEventData = DataAdapter.toEventModel(null, "wedding");
            eventModules.push(<EventModule key="wedding" event={intiialWeddingEventData} />)
        }
        return (
            <section className="client-events--container">
                {eventModules}
            </section>
        )
    } else {
        return null;
    }
}

export default EventInformation;

const EventModule = ({ event }) => {
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