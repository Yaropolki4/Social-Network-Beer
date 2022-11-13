import React from "react";
import logo from '../../../logo.svg';
import '../../../styles/FriendIcon.css';
import { useNavigate } from "react-router-dom";


const FriendIcon = ({nickName}) =>{
    const navigator = useNavigate();
    return (
        <div onClick = {()=>{navigator(`/profile/${nickName}`)}} className="profile-main-achievements-icons-icon">
            <img src={logo} alt=""/>
            <span>{nickName}</span>
        </div>
    )
}

export default FriendIcon;