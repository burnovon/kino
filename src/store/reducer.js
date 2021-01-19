import {
  DOWNLOAD_SESSIONS,
  ADD_SESSION,
  ADD_BOOKING,
  EDIT_SESSION,
  REMOVE_SESSION,
  REMOVE_BOOKING,
} from './actions';

const initialState = {
  sessions: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case DOWNLOAD_SESSIONS:
      return {
        ...state,
        sessions: payload,
      };

    case ADD_SESSION:
      return {
        ...state,
        sessions: [
          ...state.sessions,
          {
            time: payload.time,
            name: payload.name,
            bookings: [],
          },
        ],
      };

    case ADD_BOOKING:
      return {
        ...state,
        sessions: state.sessions.map((session, index) =>
          index !== payload.sessionId
            ? { ...session }
            : { ...session, bookings: [...session.bookings, payload.booking] }
        ),
      };

    case EDIT_SESSION:
      console.log(state.sessions[payload.sessionId]);
      return {
        ...state,
        sessions: state.sessions.map((session, index) =>
          index !== payload.sessionId
            ? { ...session }
            : {
                ...session,
                name: payload.data.name,
                time: payload.data.time,
              }
        ),
      };

    case REMOVE_SESSION:
      return {
        ...state,
        sessions: state.sessions.filter((session, index) => index !== payload),
      };

    case REMOVE_BOOKING:
      const removedBooking =
        state.sessions[payload.sessionId].bookings[payload.bookingId];

      const bookings = state.sessions[payload.sessionId].bookings.filter(
        (booking) => booking !== removedBooking
      );

      return {
        ...state,
        sessions: state.sessions.map((session, index) =>
          index === payload.sessionId
            ? {
                ...session,
                bookings,
              }
            : { ...session }
        ),
      };

    default:
      return state;
  }
}
