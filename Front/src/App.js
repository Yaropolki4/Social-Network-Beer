import './styles/App.css';
import React, {useState, useMemo, useEffect} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Nav from './components/Body/NAV/Nav';
import {AuthContext} from './context/index';
import AppRouter from './components/AppRouter';
import { useSelector, useDispatch } from 'react-redux';
import socket from './socket';



  function App(){
    const dispatch = useDispatch();

    socket.on('update_friendship_info', data => {

      if(data['info_status'] == 'friend_notification'){
          console.log(1);
          const notificationItem = {nickName: data.name, type: "friend_request", id: `${data.name}-friend_request`};
          dispatch({type: "ADD_NOTIFICATION", payload: notificationItem});
          dispatch({type: "received-friend-notification"});
      }
      else if(data['info_status'] == 'friends'){
          console.log(1);
          const notificationItem = {nickName: data.name, type: "accept_friend_request", id: `${data.name}-accept_friend_request`};
          dispatch({type: "to-add-friend"});
          dispatch({type: "ADD_NOTIFICATION", payload: notificationItem})
      }
      else if(data['info_status'] == 'delete'){
          console.log(1);
          dispatch({type: "DELETE_FRIEND", payload: data.name});
      }
      else if(data['info_status'] == 'reject'){
          console.log(1);
          dispatch({type: 'to-cancel-request'});
      }
      else if(data['info_status'] == 'cancel'){
          console.log(1);
          dispatch({type: 'to-cancel-request'});
          dispatch({type: 'DELETE_NOTIFICATION', payload: `${data.name}-friend_request`})
      }
  })




  let auth = 0;
  if(localStorage.getItem('test')) auth = localStorage.getItem('test');
  const [isAuth, setIsAuth] = useState();
    useEffect(() => {
      if(auth==1){
        setIsAuth(true);
      }
      else{
        setIsAuth(false);
      }
    })
  const stateFriendsIsOpen = useState(false);
  const stateNotificationsIsOpen = useState(false);
  
  return (
    
    <AuthContext.Provider value = {{isAuth, setIsAuth}}>
      <BrowserRouter>
        <div className = "body" onClick = {()=>{stateFriendsIsOpen[1](false); stateNotificationsIsOpen[1](false)}}>
          {isAuth ?<Nav stateFriendsIsOpen = {stateFriendsIsOpen} stateNotificationsIsOpen = {stateNotificationsIsOpen}/>
          : <div></div>}
          <AppRouter/>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}


export default App;
