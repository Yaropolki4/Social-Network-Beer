import React from 'react';
import logo from '../../../logo.svg';
import '../../../styles/NotificationAcceptItem.css'
import { useDispatch } from 'react-redux';

const NotificationAcceptItem = ({nickName, id}) => {

    const dispatch = useDispatch();
    const deleteNotification = () => {
        dispatch({type: 'DELETE_NOTIFICATION', payload: id})
    }
    
    
    return (
        <div className="nav-notifications-item-friend">
            <div className="nav-notifications-item-friend-ava">
                <img src={logo}/>
            </div>
            <div className="nav-notifications-item-friend-online">
                <span>{nickName} принял вашу заявку в друзья</span>
            </div>
            <div onClick = {deleteNotification} className="nav-notifications-item-friend-close">
                <img className = 'nav-notifications-item-friend-close-img' src={logo}/>
            </div>
        </div>
    );
}

export default NotificationAcceptItem;