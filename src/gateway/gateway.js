const baseUrl =
  'https://6390e3db0bf398c73a95f78a.mockapi.io/calendar/events-react/';

export const postEvent = (newEvent) =>
  fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(newEvent),
  })
    .then((response) => response.json())
    .catch(() => alert('Internal Server Error. Can"t display events'));

export const updateEvent = (taskId, updatedTask) =>
  fetch(`${baseUrl}${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(updatedTask),
  })
    .then((response) => response.json())
    .catch(() => alert('Internal Server Error. Can"t display events'));

export const deleteEvent = (taskId) =>
  fetch(`${baseUrl}${taskId}`, { method: 'DELETE' })
    .then((response) => response.json())
    .catch(() => alert('Internal Server Error. Can"t display events'));

export const fetchData = () =>
  fetch(`${baseUrl}`)
    .then((response) => response.json())
    .catch(() => alert('Internal Server Error. Can"t display events'));

export const fetchEvent = (eventId) =>
  fetch(`${baseUrl}${eventId}`)
    .then((response) => response.json())
    .catch(() => alert('Internal Server Error. Can"t display events'));
