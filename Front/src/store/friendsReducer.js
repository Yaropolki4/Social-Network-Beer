const defaultState = {
    friends: [],
}


export const friendsReducer = (state = defaultState, action) => {
    switch(action.type){
      case 'ADD_FRIEND':
        return {...state, friends: [...state.friends, action.payload]}
      case 'DELETE_FRIEND':
        return {...state, friends: state.friends.filter(friend => action.payload!==friend.id)}
      case 'MAKE_FRIEND_LIST':
        return {...state, friends: action.payload}
      default:
        return state;
    }
  }