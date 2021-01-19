const ADD_SESSION = 'ADD_SESSION';
const ADD_BOOKING = 'ADD_BOOKING';
const EDIT_SESSION = 'EDIT_SESSION';
const REMOVE_SESSION = 'REMOVE_SESSION';
const REMOVE_BOOKING = 'REMOVE_BOOKING';
const DOWNLOAD_SESSIONS = 'DOWNLOAD_SESSIONS';

const downloadSessionsAction = (sessions) => ({
  type: DOWNLOAD_SESSIONS,
  payload: sessions,
});

const addSessionAction = (name, time) => ({
  type: ADD_SESSION,
  payload: { name, time },
});

const addBookingAction = (booking) => ({
  type: ADD_BOOKING,
  payload: booking,
});

const editSessionAction = (sessionId, data) => ({
  type: EDIT_SESSION,
  payload: { sessionId, data },
});

const removeSessionAction = (sessionId) => ({
  type: REMOVE_SESSION,
  payload: sessionId,
});

const removeBookingAction = ({ sessionId, bookingId }) => ({
  type: REMOVE_BOOKING,
  payload: { sessionId, bookingId },
});

export {
  DOWNLOAD_SESSIONS,
  ADD_SESSION,
  ADD_BOOKING,
  EDIT_SESSION,
  REMOVE_SESSION,
  REMOVE_BOOKING,
  downloadSessionsAction,
  addSessionAction,
  addBookingAction,
  editSessionAction,
  removeSessionAction,
  removeBookingAction,
};
