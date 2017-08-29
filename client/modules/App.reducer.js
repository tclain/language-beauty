import {action} from '../services/state';
/**
 * with recompose utilities power, we can build a redux like environnement in minutes
 */


const actionsName = ['loading', 'error', 'content', 'insights', 'selectWord']

/**
 * GENERATE ACTIONS
 */
export const actions = {
    ...actionsName.reduce((prev, curr) => {
        return {
            ...prev,
            [curr] : action(curr)
        }
    } ,{})
}


/**
 * the default state
 */
export const defaultState = {
        loading : false,
        error : false,
        content : [],
        selected : {
            originWord : null,
            sentence : null,
            word : null
        },
        insights : null,
}


// my reducer
export const reducer = (state, {type, payload}) => {
    switch (type) {
    case "loading":
      return {
          ...state,
          loading : payload
      }
    case "error" : 
      return {
          ...state,
          error : payload
      }
    case "content" :
      return {
          ...state, 
          content: payload
      }
    case "selectWord" : 
      return {
          ...state,
          selected : payload
      }
    case "insights" : 
      return {
          ...state,
          insights : payload
      }
    default:
      return state
    }
  }