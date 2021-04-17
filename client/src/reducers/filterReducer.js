export const FILTER_INITIAL_STATE = {
  all: true,
  archived: false,
  sent: false,
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return FILTER_INITIAL_STATE;

    case 'SHOW_ARCHIVED':
      return {
        all: false,
        archived: true,
        sent: false,
      };
    case 'SHOW_SENT':
      return {
        all: false,
        archived: false,
        sent: true,
      };
    default:
      return state;
  }
};
