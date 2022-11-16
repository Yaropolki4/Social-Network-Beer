

const defaultState = {
    friendStatus: 'not-friend',
  }


export const friendStatusReducer = (state = defaultState, action) => {
    switch(action.type){
      case 'change-status':
        return {...state, friendStatus: action.payload}
      case 'to-add-friend':
        return {...state, friendStatus: 'request-was-sent'}
      case 'to-cancel-request':
        return {...state, friendStatus: 'not-friend'}
      case 'to-delete-friend':
        return {...state, friendStatus: 'not-friend'}
      case 'to-answer-reject':
        return {...state, friendStatus: 'not-friend'}
      case 'to-answer-accept':
        return {...state, friendStatus: 'friend'}
      case 'received-friend-notification':
        return {...state, friendStatus: 'waiting-answer'}
      case 'received-add-friend':
        return {...state, friendStatus: 'friend'}
      case 'received-cancel':
        return {...state, friendStatus: 'not-friend'}
      case 'loading':
        return {...state, friendStatus: 'loading'}
      default:
        return state
    }
  }