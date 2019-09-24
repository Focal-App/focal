import React from "react";
import DataAdapter from "utilities/api/dataAdapter";
import EventModule from "./EventModule";

const EventInformation = ({ events, apiHandler, setEvents, eventPackage }) => {
    let eventsToRender = [];

    const eventAlreadyExists = (events, eventName) => {
        return events.some(event => event.event_name.match(new RegExp(eventName), 'i'))
    }

    if (events && events.length >= 1) {
        events.forEach(event => eventsToRender.push({ event, newEvent: false }))
    }
    if (eventPackage.engagement_included && !eventAlreadyExists(events, /engagement/i)) {
        const intialEventData = DataAdapter.toEventModel(null, "event");
        eventsToRender.push({ event: intialEventData, newEvent: true })
    }
    if (eventPackage.wedding_included && !eventAlreadyExists(events, /wedding/i)) {
        const intialWeddingEventData = DataAdapter.toEventModel(null, "wedding");
        eventsToRender.push({ event: intialWeddingEventData, newEvent: true })
    }

    return (
        <section className="client-events--container">
            {eventsToRender.map(({ event, newEvent }) => <EventModule
                key={event.uuid ? event.uuid : event.event_name}
                event={event}
                apiHandler={apiHandler}
                setEvents={setEvents}
                package_uuid={eventPackage.uuid}
                newEvent={newEvent}
            />)}
        </section>
    )
}

export default EventInformation;