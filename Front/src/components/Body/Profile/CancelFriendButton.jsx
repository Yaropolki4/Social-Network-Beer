import '../../../styles/CancelFriendButton.css' ;
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import socket from '../../../socket.js';


function CancelFriendButton({otherUserInfo}) {

  const dispatch = useDispatch()

  let current_user_name = useSelector(state => state.info.nickName)

  const cancelReject = () => {
    dispatch({type: 'loading'});
      socket.emit('to-cancel-request',{other_user_name: otherUserInfo.nickName, current_user_name: current_user_name});
      socket.on('to-cancel-request', data => {
      setTimeout(()=>{
        dispatch({type: 'to-cancel-request'});
      }, 500);
    });
  }

  return (
    <div onClick = {cancelReject} className="profile-main-ava-cancel invis">
                        <button className="profile-main-ava-cancel-button">Отменить</button>
                    </div>
  )

}


export default CancelFriendButton;
