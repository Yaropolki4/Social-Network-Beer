import React from "react";
import '../../../styles/RegForm.css';


const RegForm = (props) =>{
    return (
        <form action="#" method = 'post' name = 'registration'>
                <div className={props.regClasses.join(' ')}>
                    <div className="regist-form-email">
                        <input value = {props.email} onChange = {(e)=>props.setEmail(e.target.value)} className = 'regist-form-input' type="text" name ='email' placeholder="E-mail" autoComplete="new-password"/>
                    </div>
                    <div className="regist-form-nick">
                        <input value = {props.regNickName} onChange = {(e)=>props.setRegNickName(e.target.value)} className = 'regist-form-input' type="text" name ='name' placeholder="Имя" autoComplete="new-password"/>
                    </div>
                    <div className="regist-form-pass">
                        <input value = {props.regPassword} onChange = {(e)=>props.setRegPassword(e.target.value)} className = 'regist-form-input' type="password" name ='password' placeholder="Пароль"/>
                    </div>
                    <div className="regist-form-repass">
                        <input value = {props.repRegPassword} onChange = {(e)=>props.setRepRegPassword(e.target.value)} className = 'regist-form-input' type="password" name ='repeat-password' placeholder="Повторите пароль"/>
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