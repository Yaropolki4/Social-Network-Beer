import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/index";
import '../../../styles/LoginForm.css';
import { useNavigate } from "react-router-dom";






const LoginForm = (props) =>{

    const {isAuth, setIsAuth} = useContext(AuthContext);
    
    const sendDataLoginFunc = (event) => {
        async function sendDataLogin(){
            let response = await fetch('/login', {
                method: 'POST',
                body: new FormData(event.target),
            });
            let result = await response.json();
            if(result['url-redirect']) setIsAuth(true);
            localStorage.setItem('test', 1);
        }
        event.preventDefault();
        sendDataLogin();
    }


    return (
        <form onSubmit = {sendDataLoginFunc} action="#" method = 'post' name = 'login'>
                <div className={props.logClasses.join(' ')}>
                    <div className="login-form-nick underline">
                        <input value = {props.nickName} onChange = {(e)=>props.setNickName(e.target.value)} type="text" name = 'login-name' placeholder="Имя / E-mail" autoComplete="new-password"/>
                    </div>
                    <div className="login-form-password underline">
                        <input value = {props.password} onChange = {(e)=>props.setPassword(e.target.value)} type="password" name = 'password' placeholder="Пароль"/>
                    </div>
                    <div className="login-form-under">
                        <div className="login-form-under-remember">
                            <input value = {props.checkbox} onChange = {(e)=>props.setCheckbox(e.target.value)} className = 'remember-checkbox' type="checkbox" name = 'remember'/>
                            <span className = 'checkbox-descr'>Запомнить меня</span>
                        </div>
                        <div className="login-form-under-submit">
                            <input  type="submit" name = 'login'/>
                        </div>
                    </div>
                    <div className="div-for-seek">
                        <input type="text" name="login"/>
                    </div>
                </div>
            </form>
    )
}

export default LoginForm;