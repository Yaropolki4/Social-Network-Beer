import '../styles/App.css';
import React, {useState} from 'react';
import '../styles/Auth.css';
import logo from '../logo.svg';
import LoginForm from '../components/Body/Auth/LoginForm';
import RegForm from '../components/Body/Auth/RegForm';
import Swicher from '../components/Body/Auth/Swicher';

function Auth() {

    const [logRegWindow, setLogRegWindow] = useState(false);

    let logClasses = ['login-form'];
    let regClasses = ['regist-form'];

    if(logRegWindow) logClasses.push('hidden');
    else regClasses.push('hidden');

  return (
    <div className="wrapper">
        <div className="logo">
            <img src={logo} alt=""/>
        </div>
        <div className="warning hidden">
            
        </div> 
        <div className="login">
            <Swicher logRegWindow = {logRegWindow} setLogRegWindow = {setLogRegWindow}/>
            <LoginForm logClasses = {logClasses}/>
            <RegForm regClasses = {regClasses}/>
        </div>
    </div>
  )

}


export default Auth;
