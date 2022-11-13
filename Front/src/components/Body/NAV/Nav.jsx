import React, {useMemo, useContext} from "react";
import Friends from './Friends';
import Navigation from './Navigation';
import '../../../styles/Nav.css';
import Notifications from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context";
import {useNavigate} from 'react-router-dom';

const Nav = ({stateFriendsIsOpen, stateNotificationsIsOpen}) => {
    const {isAuth, setIsAuth}= useContext(AuthContext);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    
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
        dispatch({type: 'MAKE_FRIEND_LIST', payload: friends});
        //navigate('/profile');
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
            <Friends/>
            <Notifications/>
        </div>
    )
}

export default Nav;