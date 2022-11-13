import {createStore, combineReducers} from 'redux';
import { friendsReducer } from './friendsReducer';
import { friendStatusReducer } from './friendStatusReducer';
import { notificationReducer } from './notificationReducer';
import { infoReducer, nameReducer } from './infoReducer';

const rootReducer = combineReducers({
    friends: friendsReducer,
    friendStatus: friendStatusReducer,
    notifications: notificationReducer,
    info: infoReducer,
})

export const store = createStore(rootReducer);