const defaultState = {
    notifications: [],
}

export const notificationReducer = (state = defaultState, action) => {
    switch(action.type){
      case 'ADD_NOTIFICATION':
        return {...state, notifications: [...state.notifications, action.payload]}
      case 'DELETE_NOTIFICATION':
        return {...state, notifications: state.notifications.filter(notification => action.payload!==notification.id)}
      case 'MAKE_NOTIFICATIONS_LIST':
        return {...state, notifications: action.payload};
      default:
        return state;
    }
  }