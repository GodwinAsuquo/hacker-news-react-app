import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING :
      return {...state, isLoading: true}
    case SET_STORIES :
      return {
        ...state, 
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      }
    case REMOVE_STORY: 
        return {
          ...state,
          hits: state.hits.filter((story)=> story.objectID !== action.payload)
           //action.payload is the id i'm getting from clicking the button
        }
    case HANDLE_SEARCH:
        return {
          ...state,
          query: action.payload,
          page: 0
        }
    case HANDLE_PAGE:
      if(action.payload === 'inc'){
        let nextPage = state.page + 1;
        if(nextPage > state.nbPages - 1){
          nextPage = 0
        }
        return {...state, page: nextPage};
      }
        //we added -1 here because the number of pages is 50 but the last page is actually 49 because the pages start from 0
       if(action.payload === 'dec'){
        let prevPage = state.page - 1;
        if(prevPage < 0){
          prevPage = state.nbPages - 1
        }
        return {...state, page: prevPage};
      }
      default:
        throw new Error (`no matching "${action.type}" action type`)
  }
}
export default reducer  


//we're setting isLoading to be true again here beciase we want the stroies to load everytime we type