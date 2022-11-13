import React from 'react';
import '../../../styles/FriendItem.css';
import logo from '../../../logo.svg';
import { useNavigate } from 'react-router-dom';


const FriendItem = ({nickName, online}) => {
    const navigate = useNavigate();
    return (
        <div className = "nav-friends-item">
            <div onClick = {()=>navigate(`/profile/${nickName}`)} className ="nav-friends-item-ava">
                <img src={logo} alt=""/>
            </div>
            <div className="nav-friends-item-nick">
                <span>{nickName}</span>
            </div>
            <div className="nav-friends-item-online">
                <span>{online ? 'Online' : 'Offline'}</span>
            </div>
        </div>
    );
}

export default FriendItem;