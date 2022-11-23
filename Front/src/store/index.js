import {createStore, combineReducers} from 'redux';
import { friendsReducer } from './friendsReducer';
import { friendStatusReducer } from './friendStatusReducer';
import { notificationReducer } from './notificationReducer';
import { infoReducer, nameReducer } from './infoReducer';
import { messageWindowReducer } from './messageWindowReducer';
import { markersReducer } from './markersReducer';
import { eventWindowReducer } from './eventWindowReducer';

const rootReducer = combineReducers({
    messager: messageWindowReducer,
    friends: friendsReducer,
    friendStatus: friendStatusReducer,
    notifications: notificationReducer,
    info: infoReducer,
    markers: markersReducer,
    eventWindow: eventWindowReducer,
})

export const store = createStore(rootReducer);