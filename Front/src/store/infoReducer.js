const defaultState = {
    nickName: '',
    status: '', 
}


export const infoReducer = (state = defaultState, action) => {
    switch(action.type){
      case 'CHANGE_INFO':
        return action.payload
      default:
        return state;
    }
  }