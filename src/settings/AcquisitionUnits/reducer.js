import {
  ACTIONS,
  ACCORDIONS,
} from './constants';

export const initialState = {
  sections: {
    [ACCORDIONS.GENERAL_INFO]: true,
    [ACCORDIONS.ACTION_PERMISSIONS]: false,
    [ACCORDIONS.MEMBERSHIPS]: false,
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
