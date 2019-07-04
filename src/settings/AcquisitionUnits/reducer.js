import { ACTIONS } from './constants';

export const initialState = {
  sections: {
    'generalInfo': true,
    'actionPermissions': false,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_EXPAND_ALL:
      return {
        ...state,
        sections: action.payload,
      };
    case ACTIONS.TOGGLE_SECTION:
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.payload]: !state.sections[action.payload],
        },
      };
    default:
      return state;
  }
};
