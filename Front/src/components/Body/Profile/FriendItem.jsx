import React, {useState} from 'react';
import '../../../styles/FriendItem.css';
import logo from '../../../logo.svg';
import { useNavigate } from 'react-router-dom';
import Messager from '../NAV/Messager';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const FriendItem = ({nickName, online}) => {
    const createWindow = () => {
        setWindowIsOpen(true);
    }

    const [windowIsOpen, setWindowIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <div>
        <Messager nickName = {nickName}/>
        {windowIsOpen == false && 
        <div onClick = {createWindow} className = "nav-friends-item-1">
            <div className ="nav-friends-item-ava">
                <img src={logo} alt=""/>
            </div>
            <div className="nav-friends-item-nick">
                <span>{nickName}</span>
            </div>
            <div className="nav-friends-item-online">
                <span>{online ? 'Online' : 'Offline'}</span>
            </div>  
            </div>
        }
        {windowIsOpen == true && 
        <div onClick = {createWindow} className = "nav-friends-item-2">
            <div className="nav-friends-add-window">
                <div className="nav-friends-add-window-button profile-button">
                    <button onClick = {()=>navigate(`/profile/${nickName}`)}>Профиль</button>
                </div>
                <div className="nav-friends-add-window-button chat-button">
                    <button onClick = {() => dispatch({type: 'CHANGE_MESSAGER_STATE', payload: {messagerIsOpen: true}})}>Чат</button>
                </div>
                <div onClick = {(e)=>{setWindowIsOpen(false); e.stopPropagation()}} className="close-button">
                    <img src={logo} alt="" />
                </div>
            </div>
        </div>
        }
        </div>
    );
}

export default FriendItem;