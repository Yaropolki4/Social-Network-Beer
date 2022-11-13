import React from "react";
import '../../../styles/Swicher.css'


const Swicher = (props) =>{
    return (
        <div className="login-swich">
                <div className="login-swich-login">
                    <button onClick = {()=> {props.setLogRegWindow(false)}} className = 'login-swich-login-button'>Вход</button>
                </div>
                <div className="login-swich-registration">
                    <button onClick = {()=> {props.setLogRegWindow(true)}} className = 'login-swich-registration-button'>Регистрация</button>
                </div>
            </div>
    )
}

export default Swicher;