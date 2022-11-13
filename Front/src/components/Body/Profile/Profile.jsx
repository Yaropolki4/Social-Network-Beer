import React from "react";
import ProfileActions from "../Profile/ProfileActions";
import ProfileFriends from "../Profile/ProfileFriends";
import ProfileInfo from "../Profile/ProfileInfo";
import '../../../styles/Profile.css';


const Profile = ({isMyProfile, otherUserInfo, otherFriends}) =>{
    return (
        <div> 
            <div className="wrapper">
                <div className="container">
                    <div className="profile-main">
                        <ProfileActions otherUserInfo = {otherUserInfo} isMyProfile = {isMyProfile}/>
                        <ProfileFriends isMyProfile = {isMyProfile} otherFriends = {otherFriends}/>
                    </div>
                    <ProfileInfo otherUserInfo = {otherUserInfo} isMyProfile = {isMyProfile}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;