import '../../../styles/AddFriendButton.css' ;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../socket.js';
import { useEffect } from 'react';




function AddFriendButton({otherUserInfo}) {


  let current_user_name = useSelector(state => state.info.nickName)

  const dispatch = useDispatch()
  const addNewFriend = () => {
    dispatch({type: 'loading'});
    socket.emit('to-add-friend',{other_user_name: otherUserInfo.nickName, current_user_name: current_user_name});
    console.log('send')
    socket.once('to-add-friend', data => {
      setTimeout(()=>{
        console.log('add');
        dispatch({type: 'to-add-friend'});
      }, 500);
    });
  }

  return (
    <div onClick = {addNewFriend}  className="profile-main-ava-add invis">
        <button className="profile-main-ava-add-button">Добавить в друзья</button>
    </div>
  )

}


export default AddFriendButton;
