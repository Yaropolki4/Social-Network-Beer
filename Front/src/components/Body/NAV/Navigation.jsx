import React from "react";
import logo from '../../../logo.svg';
import '../../../styles/Navigation.css';
import {Link} from 'react-router-dom';

const Navigation = ({stateFriendsIsOpen, stateNotificationsIsOpen}) => {
    const [friendsIsOpen, setFriendsIsOpen] = stateFriendsIsOpen;
    const [notificationsIsOpen, setNotificationsIsOpen] = stateNotificationsIsOpen;
    return(
        <div>
            <div className="nav-main nav-item">
                <Link to="/main"><img className = 'nav-main-img' src={logo} alt=""/></Link>
                <span className = 'nav-item-title'>Мейн</span>
            </div>
            <div className="nav-main nav-item">
                <Link to="/profile"><img className = 'nav-main-img' src={logo} alt=""/></Link>
                <span className = 'nav-item-title'>Профиль</span>
            </div>
            <div onClick = {()=>setFriendsIsOpen(true)} className="nav-main nav-item nav-item_friends">
                <img className = 'nav-main-img' src={logo} alt=""/>
                <span className = 'nav-item-title'>Друзья</span>
            </div>
            <div onClick = {()=>setNotificationsIsOpen(true)} className="nav-main nav-item nav-item_notifications">
                <img className = 'nav-main-img' src={logo} alt=""/>
                <span className = 'nav-item-title'>Уведомления</span>
            </div>
            <div className="nav-main nav-item ">
                <img className = 'nav-main-img' src={logo} alt=""/>
                <span className = 'nav-item-title'>Инструкция</span>
            </div>
    </div>)
}

export default Navigation;