const getSessions = async () => {
  const response = await fetch('http://localhost:4321/sessions');
  const sessions = await response.json();

  return sessions;
};

const addSession = async (session) => {
  const response = await fetch('http://localhost:4321/sessions', {
    method: 'POST',
    body: JSON.stringify(session),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { info } = await response.json();

  return info;
};

const addBooking = async ({ sessionId, booking }) => {
  const response = await fetch(
    `http://localhost:4321/sessions/${sessionId}/bookings`,
    {
      method: 'POST',
      body: JSON.stringify(booking),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const { info } = await response.json();

  return info;
};

const editSession = async ({ sessionId, time, name }) => {
  const response = await fetch(`http://localhost:4321/sessions/${sessionId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      newName: name,
      newTime: time,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { info } = await response.json();

  return info;
};

const removeSession = async (sessionId) => {
  const response = await fetch(`http://localhost:4321/sessions/${sessionId}`, {
    method: 'DELETE',
  });

  const { info } = await response.json();

  return info;
};

const removeBooking = async ({ sessionId, bookingId }) => {
  const response = await fetch(
    `http://localhost:4321/sessions/${sessionId}/bookings/${bookingId}`,
    {
      method: 'DELETE',
    }
  );

  const { info } = await response.json();

  return info;
};

export {
  getSessions,
  addSession,
  addBooking,
  editSession,
  removeSession,
  removeBooking,
};
