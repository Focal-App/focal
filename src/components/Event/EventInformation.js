import React from "react";
import DataAdapter from "utilities/api/dataAdapter";
import EventModule from "./EventModule";

const EventInformation = ({ events, apiHandler, setEvents, eventPackage }) => {
    let eventsToRender = [];

    const eventAlreadyExists = (events, eventName) => {
        return events.some(event => event.event_name.match(new RegExp(eventName), 'i'))
    }

    if (events && events.length >= 1) {
        events.forEach(event => eventsToRender.push(event))
    }
    if (eventPackage.engagement_included && !eventAlreadyExists(events, /engagement/i)) {
        const intialEventData = DataAdapter.toEventModel(null, "event");
        eventsToRender.push(intialEventData)
    }
    if (eventPackage.wedding_included && !eventAlreadyExists(events, /wedding/i)) {
        const intialWeddingEventData = DataAdapter.toEventModel(null, "wedding");
        eventsToRender.push(intialWeddingEventData)
    }

    return (
        <section className="client-events--container">
            {eventsToRender.map(event => <EventModule
                key={event.uuid ? event.uuid : event.event_name}
                event={event}
                apiHandler={apiHandler}
                setEvents={setEvents}
                package_uuid={eventPackage.uuid}
            />)}
        </section>
    )
}

export default EventInformation;