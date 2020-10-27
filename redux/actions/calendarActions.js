const TYPES = {
  FETCH: "CALENDAR_FETCH",
  SUCCESS: "CALENDAR_SUCCESS",
  ERROR: "CALENDAR_ERROR"
};

const fetchCalendar = () => ({
  type: TYPES.FETCH
});

const setCalendar = events => ({
  type: TYPES.SUCCESS,
  events
});

const setCalendarError = error => ({
  type: TYPES.ERROR,
  error
});

export { TYPES, fetchCalendar, setCalendar, setCalendarError };
