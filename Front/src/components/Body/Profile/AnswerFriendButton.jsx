import '../../../styles/AnswerFriendButton.css' ;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../socket.js';

function AnswerFriendButton({otherUserInfo}) {


  let current_user_name = useSelector(state => state.info.nickName)

  const dispatch = useDispatch()

  const addNewFriend = () => {
    let resp = true;
    dispatch({type: 'loading'});
    socket.emit('to-answer',{other_user_name: otherUserInfo.nickName, current_user_name: current_user_name, resp: resp});
    socket.once('to-answer', data => {
      setTimeout(()=>{
        const friendItem = {
          nickName: otherUserInfo.nickName,
          online: true,
          id: otherUserInfo.nickName,
        }
        dispatch({type: 'to-answer-accept'});
        dispatch({type: 'ADD_FRIEND', payload: friendItem});
        dispatch({type: 'DELETE_NOTIFICATION', payload: `${otherUserInfo.nickName}-friend_request`});
      }, 500);
    });
  }

  const rejectNotification = () => {
    let resp = false;
    dispatch({type: 'loading'});
    socket.emit('to-answer',{other_user_name: otherUserInfo.nickName, current_user_name: current_user_name, resp: resp});
    socket.once('to-answer', data => {
      setTimeout(()=>{
        dispatch({type: 'to-answer-reject'});
        dispatch({type: 'DELETE_NOTIFICATION', payload: `${otherUserInfo.nickName}-friend_request`});
      }, 500);
    });
  }

  return (
    <div className="profile-main-ava-accept invis">
                        <button onClick = {addNewFriend} className="profile-main-ava-accept-button accept">Принять</button>
                         <button onClick = {rejectNotification} className="profile-main-ava-accept-button reject">Отменить</button>
                    </div>
  )

}


export default AnswerFriendButton;
