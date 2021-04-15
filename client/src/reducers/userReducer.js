export const USER_INITIAL_STATE = {
  currentUser: null,
  guestUser: null,
  token: JSON.parse(localStorage.getItem('token')) || null,
  userLoading: true,
  authError: null,
};

export const userReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        currentUser: payload,
        guestUser: false,
        authError: null,
        userLoading: false,
      };

    case 'SET_GUEST_USER':
      return {
        ...state,
        currentUser: null,
        token: null,
        guestUser: payload,
        authError: null,
        userLoading: false,
      };

    case 'USER_LOGIN':
      localStorage.setItem('token', JSON.stringify(payload.token));
      return {
        ...state,
        currentUser: payload.user,
        token: payload.token,
        userLoading: false,
        guestUser: false,
        authError: false,
      };

    case 'USER_LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: null,
        token: null,
        userLoading: false,
        guestUser: false,
        authError: null,
      };

    case 'USER_AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: null,
        token: null,
        userLoading: false,
        guestUser: false,
        authError: payload,
      };

    case 'SET_USER_LOADING':
      return {
        ...state,
        userLoading: payload,
      };

    case 'CLEAR_AUTH_ERROR':
      return {
        ...state,
        authError: null,
      };

    default:
      return state;
  }
};
