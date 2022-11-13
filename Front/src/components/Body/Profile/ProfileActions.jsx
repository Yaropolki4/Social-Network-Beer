import React, {useState} from "react";
import logo from '../../../logo.svg';
import '../../../styles/ProfileActions.css';
import EditWindow from "./EditWindow";
import ExitWindow from './ExitWindow';
import AddFriendButton from "./AddFriendButton";
import DeleteFriendButton from "./DeleteFriendButton";
import CancelFriendButton from "./CancelFriendButton";
import AnswerFriendButton from "./AnswerFriendButton";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";

const ProfileActions = ({otherUserInfo, isMyProfile}) => {
    const [editWindowIsOpen, setEditWindowIsOpen] = useState(false);
    const [escapeWindowIsOpen, setEscapeWindowIsOpen] = useState(false);

    const friendStatus = useSelector(state => state.friendStatus.friendStatus);



    const info = useSelector(state => state.info);
    


    let editWindowClasses = ['profile-main-ava-edit'];
    if(editWindowIsOpen) editWindowClasses.push('visible');
    return (
        <div className="profile-main-ava">
                <div className="profile-main-ava-image">
                    <img src={logo} alt=""/>
                </div>
                <div className="profile-main-ava-nickname">
                    {isMyProfile && <span className = 'profile-main-ava-nickname-nick'>{info.nickName}</span>}
                    {!isMyProfile && <span className = 'profile-main-ava-nickname-nick'>{otherUserInfo.nickName}</span>}
                    {isMyProfile
                    ? <span onClick = {()=> setEscapeWindowIsOpen(true)} className = 'profile-main-ava-nickname-esc'>выйти</span>
                    : <div></div>
                }
                </div>
                <ExitWindow escapeWindowIsOpen={escapeWindowIsOpen} setEscapeWindowIsOpen={setEscapeWindowIsOpen} />
                <div className="profile-main-ava-edit-but">
                {isMyProfile
                    ? <button onClick = {(e)=>{setEditWindowIsOpen(true)}} className="profile-main-ava-edit-button">Редактировать профиль</button>
                    : <div>
                        {friendStatus === 'not-friend' && <AddFriendButton otherUserInfo = {otherUserInfo}/>}
                        {friendStatus === 'friend' && <DeleteFriendButton otherUserInfo= {otherUserInfo}/>}
                        {friendStatus === 'waiting-answer' && <AnswerFriendButton otherUserInfo = {otherUserInfo}/>}
                        {friendStatus === 'request-was-sent' && <CancelFriendButton otherUserInfo = {otherUserInfo} />}
                        {friendStatus === 'loading' && <Loading/>}
                    </div>
                }
                </div>
                <EditWindow setEditWindowIsOpen = {setEditWindowIsOpen} editWindowClasses = {editWindowClasses}/>
                
        </div>
    );
}

export default ProfileActions;