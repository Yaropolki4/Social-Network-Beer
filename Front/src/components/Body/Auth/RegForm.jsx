import React, {useState, useContext} from "react";
import '../../../styles/RegForm.css';
import { AuthContext } from "../../../context";




const RegForm = (props) =>{
    const [regNickName, setRegNickName] = useState('');
        const [regPassword, setRegPassword] = useState('');
        const [repRegPassword, setRepRegPassword] = useState('');
        const [email, setEmail] = useState('');
        const {isAuth, setIsAuth} = useContext(AuthContext);


    const registration = (event) => {
        event.preventDefault();
        let flag = false;
        if(/[a-z]/.test(regPassword)==false || /[0-9]/.test(regPassword)==false){
            // warning.classList.remove('hidden');
            // warning.innerHTML = 'Пароль слишком простой';
            flag = true;
        }
        else if(flag == false){
            //warning.classList.add('hidden');
        }
    
        if(regPassword != repRegPassword && flag!=true){
            // warning.classList.remove('hidden');
            // warning.innerHTML = 'Пароли не совпадают';
            flag = true;
        }
        else if(flag == false){
            //warning.classList.add('hidden');
        }
    
        if(regNickName<=4 || regNickName.match(/[A-z0-9]+/i)[0] != regNickName && flag!=true){
            // warning.classList.remove('hidden');
            // warning.innerHTML = 'Логин не подходит';
            flag = true;
        }
        else if(flag == false){
            //warning.classList.add('hidden');
        }   
        if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)==false && flag!=true){
            // warning.classList.remove('hidden');
            // warning.innerHTML = 'E-mail не подходит';
            flag = true;
        }
        else if(flag == false){
            //warning.classList.add('hidden');
        }
        async function sendDataLogin(){
            let response = await fetch('/login', {
                method: 'POST',
                body: new FormData(event.target),
              });
    
              let result = await response.json()
              if(result['url-redirect']){
                console.log(isAuth);
                setIsAuth(true);
                localStorage.setItem('test', 1);
              }
        }
        if(flag!=true) {
            sendDataLogin();
            flag = true;
        }
        else if(flag == false){
            //warning.classList.add('hidden');
        }
    }



    return (
        <form onSubmit = {registration} action="#" method = 'post' name = 'registration'>
                <div className={props.regClasses.join(' ')}>
                    <div className="regist-form-email">
                        <input value = {email} onChange = {(e)=>setEmail(e.target.value)} className = 'regist-form-input' type="text" name ='email' placeholder="E-mail" autoComplete="new-password"/>
                    </div>
                    <div className="regist-form-nick">
                        <input value = {regNickName} onChange = {(e)=>setRegNickName(e.target.value)} className = 'regist-form-input' type="text" name ='name' placeholder="Имя" autoComplete="new-password"/>
                    </div>
                    <div className="regist-form-pass">
                        <input value = {regPassword} onChange = {(e)=>setRegPassword(e.target.value)} className = 'regist-form-input' type="password" name ='password' placeholder="Пароль"/>
                    </div>
                    <div className="regist-form-repass">
                        <input value = {repRegPassword} onChange = {(e)=>setRepRegPassword(e.target.value)} className = 'regist-form-input' type="password" name ='repeat-password' placeholder="Повторите пароль"/>
                    </div>
                    <div className="div-for-seek">
                        <input type="text" name="registration" />
                    </div>
                    <div className="regist-form-submit">
                        <input  type="submit" name ='registration-submit'/>
                    </div>  
                </div>
            </form>
    )
}

export default RegForm;