import {SET_PAGE_TITLE} from '../actions';

const initialState = {
  pageTitle: '',
};

const markdownApp = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.pageTitle,
      };
    default:
      return state;
  }
};

export default markdownApp;
