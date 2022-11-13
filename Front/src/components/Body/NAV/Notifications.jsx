import React, {useState} from 'react';
import '../../../styles/Notifications.css';
import NotificationAcceptItem from './NotificationAcceptItem';
import NotificationAddItem from './NotificationAddItem';
import { useSelector } from 'react-redux';

const Notifications = () => {
    
    const notifications = useSelector(state => state.notifications.notifications);

    return (
        <div className = 'nav-notifications'>
            {notifications.map((notification)=> {
                if(notification.type === 'friend_request'){
                    return <NotificationAddItem id = {notification.id} nickName = {notification.nickName} key = {notification.nickName}/>
                }
                else if(notification.type === 'accept_friend_request') return <NotificationAcceptItem id = {notification.id} nickName = {notification.nickName} key = {notification.nickName}/>
            })}
        </div>
    )
}

export default Notifications