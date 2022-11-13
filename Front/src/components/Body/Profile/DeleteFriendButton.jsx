import '../../../styles/DeleteFriendButton.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../socket.js';

function DeleteFriendButton({otherUserInfo}) {

  const dispatch = useDispatch()

  let current_user_name = useSelector(state => state.info.nickName)

  const deleteOldFriend = () => {
    dispatch({type: 'loading'})
    socket.emit('to-delete-friend', {other_user_name: otherUserInfo.nickName, current_user_name: current_user_name});
    socket.on('to-delete-friend', data => {
      setTimeout(()=>{
        dispatch({type: 'to-delete-friend'});
        dispatch({type: 'DELETE_FRIEND', payload: otherUserInfo.nickName});
      }, 500);
    })
  }

  

  return (
    <div onClick = {deleteOldFriend} className="profile-main-ava-remove">
        <button className="profile-main-ava-remove-button">Удалить из друзей</button>
    </div>
  )

}


export default DeleteFriendButton;
