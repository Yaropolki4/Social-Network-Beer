import React from "react";
import ProfileEvents from "./ProfileEvents";
import ProfileActiv from "./ProfileActiv";
import '../../../styles/ProfileInfo.css';
import { useSelector } from "react-redux";


const ProfileInfo = ({isMyProfile, otherUserInfo}) =>{
    const status = useSelector(state => state.info.status);
    return (
        <div className="profile-info">
            <div className="profile-info-status">
                {isMyProfile && <span>{status}</span>}
                {!isMyProfile && <span>{otherUserInfo.status}</span>}
            </div>
            <ProfileEvents/>
            <ProfileActiv/>
        </div>
    )
}

export default ProfileInfo;