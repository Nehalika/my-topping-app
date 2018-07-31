import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
//export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const FETCH_TOPPINGS = 'FETCH_TOPPINGS';
export const RECEIVED_TOPPINGS = 'RECEIVED_TOPPINGS';
export const TOPPINGS_ERROR = 'TOPPINGS_ERROR';
export const ADD_TOPPING = 'ADD_TOPPING';
export const REMOVE_TOPPING = 'REMOVE_TOPPING';

// ------------------------------------
// Actions
// ------------------------------------

export function fetchToppings(status) {
  return {
    type: FETCH_TOPPINGS,
    fetching: status
  }
}

export function receivedToppings(payload) {
  return { 
    type: RECEIVED_TOPPINGS,
    toppings: payload
  }
}

export function toppingsError(status) {
  return {
    type: TOPPINGS_ERROR,
    // error: status
  }
}
export function addTopping(index) {
  return{
    type: ADD_TOPPING,
    key:index
  }
}

export function removeTopping(index) {
  return {
    type: REMOVE_TOPPING,
    key:index
  }
}

// ----------------------------------------
// Action Creators
// ----------------------------------------

export const doubleAsync = () => {
  return (dispatch) => {
    dispatch(fetchToppings(true));
    let url = 'https://www.dominos.co.id/infdominos/api/getpizzatoppings';
    const token = 'lER2MLyGC6Go3rNdE7diPVf0umanUuTf8KhVwPB9ViyZJldnsqFhmViQisdcW6s4';
    axios.get(url, {
      method: 'get',
      headers: {
        'token': token,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
        console.log(response);
        if (typeof response !== 'undefined') {
          let data = response.data.data;
          dispatch(fetchToppings(false));
          dispatch(receivedToppings(data));
        }      
      }).catch(error => {
      dispatch(toppingsError(true));
    });
  };
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  
  [FETCH_TOPPINGS]    : (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_TOPPINGS]    : (state, action) => {
    return {
      ...state,
      toppings: action.toppings
    };
  },
  [TOPPINGS_ERROR]    : (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [ADD_TOPPING]    : (state, action) => {
    return {
      ...state,
      error: action.key
    };
  },
  [REMOVE_TOPPING]    : (state, action) => {
    return {
      ...state,
      error: action.key
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  toppings: {},
  error: false,

}
//
 
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
