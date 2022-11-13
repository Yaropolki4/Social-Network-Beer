import '../styles/App.css';
import React, {useState} from 'react';
import '../styles/Auth.css';
import logo from '../logo.svg';
import LoginForm from '../components/Body/Auth/LoginForm';
import RegForm from '../components/Body/Auth/RegForm';
import Swicher from '../components/Body/Auth/Swicher';

function Auth() {

    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [regNickName, setRegNickName] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [repRegPassword, setRepRegPassword] = useState('');
    const [email, setEmail] = useState('');
    const [logRegWindow, setLogRegWindow] = useState(false);
    const [checkbox, setCheckbox] = useState(false);

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
            <LoginForm logClasses = {logClasses} nickName = {nickName} setNickName = {setNickName} password = {password} setPassword = {setPassword} checkbox = {checkbox} setCheckbox = {setCheckbox}/>
            <RegForm regClasses = {regClasses} email = {email} setEmail = {setEmail} regNickName = {regNickName} setRegNickName = {setRegNickName} regPassword = {regPassword} setRegPassword = {setRegPassword} repRegPassword = {repRegPassword} setRepRegPassword = {setRepRegPassword}/>
        </div>
    </div>
  )

}


export default Auth;
