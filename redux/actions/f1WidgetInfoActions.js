const TYPES = {
  FETCH: "WIDGET_INFO_FETCH",
  SUCCESS: "WIDGET_INFO_SUCCESS",
  ERROR: "WIDGET_INFO_ERROR"
};

const fetchWidgetInfo = ({ isServer }) => ({
  type: TYPES.FETCH,
  isServer: isServer
});

const setWidgetInfo = infoData => ({
  type: TYPES.SUCCESS,
  infoData: infoData
});

const setWidgetInfoServer = infoData => ({
  type: TYPES.SUCCESS,
  infoData: infoData
});

const setWidgetInfoError = error => ({
  type: TYPES.ERROR,
  error
});

export {
  TYPES,
  fetchWidgetInfo,
  setWidgetInfo,
  setWidgetInfoServer,
  setWidgetInfoError
};
