import { TYPES } from "../actions/calendarActions";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  events: [],
  error: null,
  isLoading: false
};

const calendarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HYDRATE: {
      //hydrate only if server sends all events (calendar page visited)
      if (state.events.length < action.payload.calendar.events.length) {
        return {
          ...action.payload.calendar
        };
      }
    }
    case TYPES.FETCH:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        events: action.events
      };
    }
    case TYPES.ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
  }
  return state;
};

export default calendarReducer;
