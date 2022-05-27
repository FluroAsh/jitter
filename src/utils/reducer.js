/**
 * Alternative to 'useState', more complex but more powerful
 * 'useState' is syntactic sugar of 'useReducer' that simplifies it
 * similar to Redux
 */

/**
 * Reducer Function
 * it receives 2 parameters
 * it will receive the current state
 * it receives the action we want to implement on the state
 * based in action the function will update the state one way or another
 * action is an object with 2 keys (type & data)
 * -- 'type' key determines what is the 'action' we are taking
 * -- 'data' key contains the 'data' necessary to update the state
 */

export function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case 'cleanState': {
      return {
        messageList: [],
        loggedInUser: '',
      };
    }
    case 'setMessageList': {
      // populate the 'messageList' Array with the initial values
      console.log(state);
      return {
        ...state,
        messageList: action.data,
      };
    }
    case 'addMessage': {
      // receives a message & adds to the messageList
      return {
        ...state,
        messageList: [...state.messageList, action.data],
      };
    }
    case 'setLoggedInUser': {
      console.log(action.data[1]);
      return {
        ...state,
        loggedInUser: action.data,
      };
    }
    // return state as it was previously
    default:
      return state;
  }
}
