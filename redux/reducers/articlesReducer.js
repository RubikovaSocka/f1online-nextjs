import { ARTICLES } from '../constants'

const defaultState = {
  stickyArticles = [],
  nonStickyArticles = [],
  isLoading: false,
  error: null
}

const articlesReducer = (state = defaultState, action) => {
  switch(action.type) {
    case ARTICLES.FETCH:
      return {
        ...state,
        isLoading: true,
        error: null,
        
      }
  }
}

export default articlesReducer;