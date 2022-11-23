import React, {useState} from "react";
import '../../../styles/EventWindow.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FriendBlock from "./FriendBlock";
import { Socket } from "socket.io-client";

const EventWindow = ({setWindowCoords,windowCoords, position}) => {

    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const dispatch = useDispatch();
    const nickName = useSelector(state => state.info.nickName);
    const [buttonFriendsClasses, setButtonFriendsClasses] = useState(['button-friends']);
    const [listFriendsClasses, setListFriendsClasses] = useState(['list-of-friends']);
    const eventWindowIsOpen = useSelector(state => state.eventWindow.eventWindowIsOpen);
    const [invitedFriends, setInvitedFriends] = useState([]);


    useEffect(() => {
        if(eventWindowIsOpen){
            setButtonFriendsClasses([...buttonFriendsClasses, 'active']);
            setListFriendsClasses([...listFriendsClasses, 'active']);
        }
        else{
            setButtonFriendsClasses(['button-friends']);
            setListFriendsClasses(['list-of-friends']);
        }
    }, [eventWindowIsOpen]);


    const setPoint = (e) => {
        e.preventDefault();
        dispatch({type: 'ADD_MARKER', payload: {coords: position, author: nickName, title: title, descr: descr}});
        setWindowCoords(undefined);
    }

    const friends = useSelector(state => state.friends.friends);

    const manageButton = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(!eventWindowIsOpen) dispatch({type: 'CHANGE_EVENT_STATE', payload: true});
        else dispatch({type: 'CHANGE_EVENT_STATE', payload: false});
    }

    
 
    return (
        <form action="">
        <div style ={{top: windowCoords[1], left: windowCoords[0]}} className="event-window">
            <div className = 'title'>Название события</div>
            <input onChange = {(e)=>setTitle(e.target.value)} value = {title} className="text-title" type = 'text'/>
            <div className = 'description'>Описание</div>
            <textarea onChange = {(e)=>setDescr(e.target.value)} value = {descr} className="text-description"></textarea>
            <div className = 'friends'>
                <span>Приглашения</span>
            </div>
            <div className = 'field-and-button'>
                <div className={buttonFriendsClasses.join(' ')}>
                    <button onClick = {manageButton}>пригласить друзей</button>
                    <div onClick = {e=>e.stopPropagation()} className={listFriendsClasses.join(' ')}>
                        {friends.map(item => <FriendBlock invitedFriends = {invitedFriends} setInvitedFriends = {setInvitedFriends} key = {item.nickName}>{item.nickName}</FriendBlock>)}
                    </div>
                </div>
                <div className = 'field-of-friends'>
                    <input type="text" />
                </div>
            </div>
            <div className="submit-and-reset">
                <input onClick = {setPoint} type="submit" />
                <input onClick = {e => {
                    setTitle('');
                    setDescr('');
                }} type="reset" />
            </div>
        </div>
        </form>
    )
}

export default EventWindow