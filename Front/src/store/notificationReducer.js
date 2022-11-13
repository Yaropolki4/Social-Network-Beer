const defaultState = {
    notifications: [
        {nickName: 'бухарик', type: 'friend_request', id: 1,},
        {nickName: 'пивун', type: 'accept_friend_request', id: 2},
        {nickName: 'водочник', type: 'friend_request', id: 3},
    ],
}

export const notificationReducer = (state = defaultState, action) => {
    switch(action.type){
      case 'ADD_NOTIFICATION':
        return {...state, notifications: [...state.notifications, action.payload]}
      case 'DELETE_NOTIFICATION':
        return {...state, notifications: state.notifications.filter(notification => action.payload!==notification.id)}
      default:
        return state;
    }
  }