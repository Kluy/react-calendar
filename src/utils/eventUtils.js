export const getDate = (date, time) => new Date(`${date}T${time}`);

export const checkEventDuration = (timeFrom, timeTo) => {
  const eventDuration = timeTo - timeFrom;

  if (eventDuration < 0) {
    alert('Event end time before event start time');
  } else if (eventDuration > 21600000) {
    alert('Event can not be longer then 6 hours');
  } else return true;
};

export const checkEventCrossing = (events, timeFrom, timeTo) => {
  const eventCrossing = events.every(
    event => event.dateFrom.getTime() > timeTo || event.dateTo.getTime() < timeFrom,
  );
  if (!eventCrossing) alert('You already have event at this time');
  else return true;
};

export const checkEventData = (title, date, startTime, endTime) => {
  if (!title) {
    alert('Event title is empty. Please, add event title');
  } else if (!date) {
    alert('Event date is empty. Please, add event date');
  } else if (!startTime) {
    alert('Event start time is empty. Please, add event start time');
  } else if (!endTime) {
    alert('Event end time is empty. Please, add event end time');
  } else return true;
};
