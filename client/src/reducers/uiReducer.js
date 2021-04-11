export const UI_INITIAL_STATE = {
  showModal: false,
  modalData: null,
  showUserMenu: false,
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

    default:
      return state;
  }
};
