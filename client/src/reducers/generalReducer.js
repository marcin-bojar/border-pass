export const GENERAL_INITIAL_STATE = {
  newVersionAvailable: {
    status: false,
    onConfirm: () => {},
  },
  editMode: false,
  sendMode: false,
  isMakingApiCall: false,
};

export const generalReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'NEW_VERSION_AVAILABLE':
      return {
        ...state,
        newVersionAvailable: {
          status: true,
          onConfirm: payload,
        },
      };

    case 'UPDATED_TO_NEW_VERSION':
      return {
        ...state,
        newVersionAvailable: {
          status: false,
          onConfirm: () => {},
        },
      };

    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        editMode: !state.editMode,
      };

    case 'TOGGLE_SEND_MODE':
      return {
        ...state,
        sendMode: !state.sendMode,
      };

    case 'SET_IS_MAKING_API_CALL':
      return {
        ...state,
        isMakingApiCall: payload,
      };

    default:
      return state;
  }
};
