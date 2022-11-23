const defaultState = {
    eventWindowIsOpen: false,
}


export const eventWindowReducer = (state = defaultState, action) => {
    switch(action.type){
      case 'CHANGE_EVENT_STATE':
        return {eventWindowIsOpen: action.payload}
      default:
        return state;
    }
  }