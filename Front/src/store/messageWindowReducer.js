const defaultState = {
    messagerIsOpen: false,
}


export const messageWindowReducer = (state = defaultState, action) => {
    switch(action.type){
      case 'CHANGE_MESSAGER_STATE':
        return action.payload
      default:
        return state;
    }
  }