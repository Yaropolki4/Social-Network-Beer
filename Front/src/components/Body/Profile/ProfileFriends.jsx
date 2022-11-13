import React from "react";
import FriendIcon from "./FriendIcon";
import '../../../styles/ProfileFriends.css';
import { useSelector } from "react-redux";


const ProfileFriends = ({otherFriends, isMyProfile}) =>{
    const friends = useSelector(state => state.friends.friends);
    return (
        <div className="profile-main-achievements">
            <div className="profile-main-achievements-header">
                <span>Друзья</span>
            </div>
            <div className="profile-main-achievements-icons">
                {!isMyProfile && otherFriends.slice(0,6).map((friend)=>{
                    return <FriendIcon nickName = {friend.nickName} key ={friend.nickName}/>
                })}
                {isMyProfile && friends.slice(0,6).map((friend)=>{
                    return <FriendIcon nickName = {friend.nickName} key ={friend.nickName}/>
                })}
            </div>
        </div>
    )
}

export default ProfileFriends;