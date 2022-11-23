import React, {useState, useRef, useEffect} from "react";
import '../../../styles/Messager.css';
import logo from '../../../logo.svg';
import socket from '../../../socket';
import MessageItem from "./MessageItem";
import { useDispatch, useSelector } from "react-redux";



const Messager = ({nickName}) => {

    const [messagerClasses, setMessagerClasses] = useState(['nav-friends-chat'])
    const textArea = useRef(null);
    const fieldRef = useRef(null);  

    const dispatch = useDispatch();
    const messagerIsOpen = useSelector(state => state.messager.messagerIsOpen);


    const current_user_name = useSelector(state => state.info.nickName);
    const [messages, setMessages] = useState([]);
    const addMessage = (type, body) => {
        const messageItem = {type: '', body: ''};
        setMessages([...messages, messageItem]);
    }
    useEffect(() => {
        if(messagerIsOpen) setMessagerClasses(['nav-friends-chat opened']);
        else setMessagerClasses(['nav-friends-chat']);
    }, [messagerIsOpen]);

    const changeTextArea = (event) => {
        let tags = /<(.*?)>/g;
        let data = textArea.current.innerHTML;
        if(event.code == 'Enter' && event.shiftKey === false && data.replace(tags, '')){
            textArea.current.innerHTML = '';
            setTimeout(()=>{
                if(textArea.current.querySelectorAll('div')[1]){
                    let div = textArea.current.querySelectorAll('div')[0];
                    div.remove();
                }
            }, 0);
            console.log(data.replace(tags, ''));
            socket.send(`${data.replace(tags, '')}`);
        }
    }

    socket.on('message', data => {      
        addMessage('from-me', data);
        fieldRef.current.scrollIntoView({ top: false,
            behavior: 'smooth',
            block: 'start',
        });
    });

    return (
        <div className={messagerClasses}>
                    <div className="nav-friends-chat-field">
                    <MessageItem nickName = {nickName} type = 'to-me' body = 'hsdafkllkjadshlksdhfklsadhlasdhfklasdflkdwefwefwefwefwefwefwefwefwe'/>
                    <MessageItem nickName = {nickName} type = 'from-me' body = 'hsdafkllkjadshlksdhfklsadhlasdhfklasdflkdwefwefwefwefwefwefwefwefwe'/>
                        {messages.map(item => {
                            return <MessageItem nickName = {nickName} ref={fieldRef} type = {item.type} body = {item.body}/>
                        })}
                    </div>
                    <div className="nav-friends-chat-form">
                        <form name = 'chatForm' action="">
                            <div className="form-container">
                                <div ref = {textArea} onKeyDown={changeTextArea} contentEditable="true"  className="nav-friends-chat-form-text">
                                    
                                </div>
                                <div className="nav-friends-chat-form-submit" >
                                    <input name = 'message-submit' type="submit"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div onClick = {()=>dispatch({type: 'CHANGE_MESSAGER_STATE', payload: {messagerIsOpen: false}})} className="nav-friend-chat-close">
                        <img src={logo} alt=""/>
                    </div>
                </div>
    )
}

export default Messager