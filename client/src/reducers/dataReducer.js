import defaultCountries from '../../../helpers/defaultCountries';

import { sortHistoryListByTimeAndDate, setCurrentCountry } from '../utils';

export const DATA_INITIAL_STATE = {
  currentCountry: '',
  countries: JSON.parse(localStorage.getItem('countries')) || defaultCountries,
  places: JSON.parse(localStorage.getItem('places')) || [],
  historyList: JSON.parse(localStorage.getItem('borders')) || [],
  editedItem: null,
  isSortedDesc: Boolean(localStorage.getItem('isSortedDesc') === 'true') || false,
  selection: { startIndex: null, endIndex: null },
  selectedArchive: null,
};

export const dataReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SET_HISTORY_LIST':
      return {
        ...state,
        historyList: payload,
        currentCountry: setCurrentCountry(payload, state.isSortedDesc),
        editedItem: null,
      };

    case 'REVERSE_HISTORY_LIST':
      return {
        ...state,
        historyList: payload,
        isSortedDesc: !state.isSortedDesc,
      };

    case 'SEND_MODE_ON':
      return {
        ...state,
        historyList: sortHistoryListByTimeAndDate([...state.historyList], true),
        isSortedDesc: false,
      };

    case 'SEND_MODE_OFF':
      return {
        ...state,
        historyList: sortHistoryListByTimeAndDate([...state.historyList], false),
        isSortedDesc: true,
      };

    case 'SET_SELECTION':
      return {
        ...state,
        selection: payload,
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selection: { startIndex: null, endIndex: null },
      };

    case 'SET_USER_DATA':
      return {
        ...state,
        historyList: payload.historyList,
        countries: payload.countries,
        places: payload.places,
        currentCountry: setCurrentCountry(payload.historyList, state.isSortedDesc),
      };

    case 'SET_GUEST_DATA':
      const guestHistoryList = sortHistoryListByTimeAndDate(
        [...JSON.parse(localStorage.getItem('borders'))],
        !state.isSortedDesc,
        'timestamp'
      );

      return {
        ...state,
        historyList: guestHistoryList,
        countries: [...JSON.parse(localStorage.getItem('countries'))],
        places: [...JSON.parse(localStorage.getItem('places'))],
        currentCountry: setCurrentCountry(guestHistoryList, state.isSortedDesc),
      };

    case 'SET_CURRENT_COUNTRY':
      return {
        ...state,
        currentCountry: payload,
      };

    case 'SET_COUNTRIES':
      return {
        ...state,
        countries: payload,
      };

    case 'SET_PLACES':
      return {
        ...state,
        places: payload,
      };

    case 'SET_EDITED_ITEM':
      return {
        ...state,
        editedItem: payload,
      };

    case 'SET_SELECTED_ARCHIVE':
      return {
        ...state,
        selectedArchive: payload,
      };

    default:
      return state;
  }
};
