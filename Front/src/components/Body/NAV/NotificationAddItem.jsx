import React from 'react';
import logo from '../../../logo.svg';
import '../../../styles/NotificationAddItem.css';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../socket';

const NotificationAddItem = ({id, nickName}) => {
    const dispatch = useDispatch();
    const current_user_name = useSelector(state => state.info.nickName);
    
    const acceptFriend = () => {
        let resp = true;
        dispatch({type: 'loading'});
        socket.emit('to-answer',{other_user_name: `${nickName}`, current_user_name: current_user_name,
        resp: resp});
        socket.once('to-answer', data => {
            const friendItem = {
                nickName,
                online: true,
                id: nickName,
              }
              dispatch({type: 'to-answer-accept'});
              dispatch({type: 'ADD_FRIEND', payload: friendItem});
              dispatch({type: 'DELETE_NOTIFICATION', payload: `${nickName}-friend_request`});
    });
    }

    const rejectFriend = () => {
        let resp = false;
        dispatch({type: 'loading'});
        socket.emit('to-answer',{other_user_name: `${nickName}`, current_user_name: current_user_name,
        resp: resp});
        socket.once('to-answer', data => {
            setTimeout(()=>{
              dispatch({type: 'to-answer-reject'});
              dispatch({type: 'DELETE_NOTIFICATION', payload: `${nickName}-friend_request`});
            }, 500);
          });
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
                    <div onClick = {rejectFriend} className="nav-notifications-item-reject">
                        <button>Отклонить</button>
                    </div>
                </div>
    );
}

export default NotificationAddItem;