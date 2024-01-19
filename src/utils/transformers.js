export function addValueToObjects(events) {
  return events.map((event) => {
    return { ...event, value: event.label.toLowerCase() };
  });
}
