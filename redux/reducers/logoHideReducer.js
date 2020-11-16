export const TYPES = {
  SHOW: "LOGO_SHOW",
  HIDE: "LOGO_HIDE"
};

const defaultState = {
  logoShown: true
};

const logoHideReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.SHOW:
      return {
        logoShown: true
      };
    case TYPES.HIDE:
      return {
        logoShown: false
      };
  }
  return state;
};

export default logoHideReducer;
