import React from "react";
import { useState, useContext } from "react";
import '../../../styles/ExitWindow.css';
import { AuthContext } from "../../../context/index";

const ExitWindow = ({setEscapeWindowIsOpen, escapeWindowIsOpen}) =>{


    const ExitFunction = (e) => {
        async function Logout(){
            await fetch('/logout', {
                method: 'GET',
            });
            localStorage.setItem('test', 0);
            setIsAuth(false);
        }
        Logout();
    }


    let escapeWindowClasses = ['profile-main-ava-nickname-escapeWindow'];
    const {isAuth, setIsAuth}= useContext(AuthContext);

    if(escapeWindowIsOpen) escapeWindowClasses.push('visible');

    return (
        <div onClick = {() => setEscapeWindowIsOpen(false)} className={escapeWindowClasses.join(' ')}>
                            <div onClick = {e => e.stopPropagation()} className='profile-main-ava-nickname-escapeWindow-window'>
                                <div className="window-text">Ты действительно хочешь выйти?</div>
                                <div className="window-buttons">
                                    <div className="window-buttons-exit">
                                        <button onClick={ExitFunction} className = 'window-buttons-exit-button window-button'>Выйти</button>
                                    </div>
                                    <div className="window-buttons-cancel">
                                        <button onClick = {() => setEscapeWindowIsOpen(false)} className="window-buttons-cancel-button window-button">Отмена</button>
                                    </div>
                                </div>
                            </div>
                        </div>
    )
}

export default ExitWindow;
