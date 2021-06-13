export const UI_INITIAL_STATE = {
  showModal: false,
  modalData: null,
  showUserMenu: false,
  showPlaces: true,
};

export const uiReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: true,
      };

    case 'HIDE_MODAL':
      return {
        ...state,
        showModal: false,
      };

    case 'TOOGLE_USER_MENU':
      return {
        ...state,
        showUserMenu: !state.showUserMenu,
      };

    case 'HIDE_USER_MENU':
      return {
        ...state,
        showUserMenu: false,
      };

    case 'SET_MODAL_DATA':
      return {
        ...state,
        modalData: payload,
      };

    case 'SET_SHOW_PLACES':
      return {
        ...state,
        showPlaces: payload,
      };

    default:
      return state;
  }
};
