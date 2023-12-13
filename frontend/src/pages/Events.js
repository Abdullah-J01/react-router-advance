import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center'}}>Loading..</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

export const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      { message: "Couldn't fetch events" },
      {
        status: 500,
      }
    );
  } else {
    const data = await response.json();
    return data.events;
  }
};

export const eventsLoader = () => {
  return defer({
    events: loadEvents(),
  });
};
