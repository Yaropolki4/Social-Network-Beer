import React from 'react';
import logo from '../../../logo.svg';
import '../../../styles/NotificationAddItem.css';
import { useDispatch } from 'react-redux';
import socket from '../../../socket';

const NotificationAddItem = ({id, nickName}) => {
    const dispatch = useDispatch();
    
    const acceptFriend = () => {
        let resp = true;
        dispatch({type: 'loading'});
        socket.emit('resp_friendship_request',{name: `${nickName}`,
        resp: resp});
        socket.on('resp_friendship_request', data => {
            const friendItem = {
                nickName,
                online: true,
                id: nickName,
              }
        dispatch({type: 'to-answer-accept'});
        dispatch({type: 'ADD_FRIEND', payload: friendItem});
        dispatch({type: 'DELETE_NOTIFICATION', payload: id});
    })
    }

    return (
        <div className="nav-notifications-item">
                    <div className="nav-notifications-item-ava">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="nav-notifications-item-online">
                        <span>Заявка в друзья</span>
                    </div>
                    <div className="nav-notifications-item-nick">
                        <span>{nickName}</span>
                    </div>
                    <div onClick = {acceptFriend} className="nav-notifications-item-accept">
                        <button>Принять</button>
                    </div>
                    <div className="nav-notifications-item-reject">
                        <button>Отклонить</button>
                    </div>
                </div>
    );
}

export default NotificationAddItem;