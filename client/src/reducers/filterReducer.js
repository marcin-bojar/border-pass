export const FILTER_INITIAL_STATE = {
  showAll: true,
  showArchived: false,
  showSent: false,
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return FILTER_INITIAL_STATE;

    case 'SHOW_ARCHIVED':
      return {
        showAll: false,
        showArchived: true,
        showSent: false,
      };
    case 'SHOW_SENT':
      return {
        showAll: false,
        showArchived: false,
        showSent: true,
      };
    default:
      return state;
  }
};
