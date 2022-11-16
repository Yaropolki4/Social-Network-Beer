import React, {useState} from 'react';
import '../../../styles/FriendItem.css';
import logo from '../../../logo.svg';
import { useNavigate } from 'react-router-dom';


const FriendItem = ({nickName, online}) => {

    const createWindow = () => {
        setWindowIsOpen(true);
    }

    const [windowIsOpen, setWindowIsOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
        {windowIsOpen == false && 
        <div onClick = {createWindow} className = "nav-friends-item">
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
        <div onClick = {createWindow} className = "nav-friends-item">
            <div className="nav-friends-add-window">
                <div className="nav-friends-add-window-button profile-button">
                    <button onClick = {()=>navigate(`/profile/${nickName}`)}>Профиль</button>
                </div>
                <div className="nav-friends-add-window-button chat-button">
                    <button>Чат</button>
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