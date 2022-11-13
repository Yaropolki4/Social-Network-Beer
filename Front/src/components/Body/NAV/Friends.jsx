import React, {useState} from 'react';
import '../../../styles/Friends.css';
import FriendItem from '../Profile/FriendItem';
import {useSelector } from "react-redux";

const Friends = () => {

    const friends = useSelector(state => state.friends.friends);
    console.log(friends)
    return (
        <div className = 'nav-friends'>
            {friends.map((friend)=> {
                return <FriendItem nickName = {friend.nickName} online = {friend.online} key = {friend.nickName}/>
            })}
        </div>
    )
}

export default Friends
