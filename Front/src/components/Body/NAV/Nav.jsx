import React, {useMemo, useContext, useEffect} from "react";
import Friends from './Friends';
import Navigation from './Navigation';
import '../../../styles/Nav.css';
import Notifications from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context";
import {useNavigate} from 'react-router-dom';
import socket from "../../../socket";

const Nav = ({stateFriendsIsOpen, stateNotificationsIsOpen}) => {


    
    socket.connect();
    const {isAuth, setIsAuth}= useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();



  useEffect(()=> {
    const receivedNotification = (data) => {
      if(data['info_status'] == 'received-friend-notification'){
          const notificationItem = {nickName: data.name, type: "friend_request", id: `${data.name}-friend_request`};
          dispatch({type: "ADD_NOTIFICATION", payload: notificationItem});
          dispatch({type: "received-friend-notification"});
      }
      else if(data['info_status'] == 'friend-require-was-accepted'){
          const notificationItem = {nickName: data.name, type: "accept_friend_request", id: `${data.name}-accept_friend_request`};
          const friendItem = {
            nickName: data.name,
            online: true,
            id: data.name,
          }
          dispatch({type: "received-add-friend"});
          dispatch({type: "ADD_NOTIFICATION", payload: notificationItem});
          dispatch({type: 'ADD_FRIEND', payload: friendItem})
      }
      else if(data['info_status'] == 'friend-deleted-you'){
          dispatch({type: "DELETE_FRIEND", payload: data.name});
          dispatch({type: 'to-delete-friend'});
          dispatch({type: 'DELETE_NOTIFICATION', payload: `${data.name}-accept_friend_request`})
      }
      else if(data['info_status'] == 'friend-require-was-rejected'){
          dispatch({type: 'to-cancel-request'});
      }
      else if(data['info_status'] == 'friend-require-was-canceled'){
          dispatch({type: 'to-cancel-request'});
          dispatch({type: 'DELETE_NOTIFICATION', payload: `${data.name}-friend_request`})
      }
    }
    socket.on('update_friendship_info', receivedNotification);
    return () => socket.off('update_friendship_info', receivedNotification);
  })



    
    async function GetInfo(){
        let response = await fetch('/profile', {
          method: 'GET',
        });
        let result = await response.json()
        dispatch({type: 'CHANGE_INFO', payload: {nickName: result.name, status: result.description}});
        let friendList = result.friends_list;
        let friends = []
        for (let item of friendList){
            friends.push({nickName: item, online: true, id: item});
        }
        const notifications = [];
        const notificationList = result.notifications;
        for (let item of notificationList){
            notifications.push({nickName: item.user_name, type: item.notification_type, id: `${item.user_name}-${item.notification_type}`})
        }
        
        dispatch({type: 'MAKE_FRIEND_LIST', payload: friends});
        dispatch({type: 'MAKE_NOTIFICATIONS_LIST', payload: notifications});
        socket.emit('connection', {current_user_name: result.name});
      }
    
    
    useMemo(() => {
        GetInfo();
    }, [isAuth]);

    const [friendsIsOpen, setFriendsIsOpen] = stateFriendsIsOpen;
    const [notificationsIsOpen, setNotificationsIsOpen] = stateNotificationsIsOpen;

    const navClasses = ['nav'];

    if(friendsIsOpen) navClasses.push('visible fr_open');
    if(notificationsIsOpen) navClasses.push('visible nt_open')

    return (
        <div onClick = {(e)=>{e.stopPropagation()}} className = {navClasses.join(' ')}>
            <Navigation stateFriendsIsOpen = {stateFriendsIsOpen} stateNotificationsIsOpen = {stateNotificationsIsOpen}/>
            <Friends stateFriendsIsOpen = {stateFriendsIsOpen}/>
            <Notifications/>
        </div>
    )
}

export default Nav;