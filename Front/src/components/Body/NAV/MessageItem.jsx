import React from "react";
import '../../../styles/MessageItem.css';
import { useSelector } from "react-redux";


const MessageItem = ({nickName, type, body}) => {

    const myName = useSelector(state => state.info.nickName);



    let classItem;
    let name;
    if(type=='from-me'){
        classItem = "nav-friends-chat-field-item nav-friends-chat-field-item-1";
        name = myName;
    } 
    else if (type == 'to-me') {
        classItem = 'nav-friends-chat-field-item nav-friends-chat-field-item-2';
        name = nickName;
    }
    return (
        <div className={classItem}>
            <div className="message-name">
                {name}
            </div>
            <div className = 'message-body'>
                {body}
            </div>
        </div>
    )
}


export default MessageItem;