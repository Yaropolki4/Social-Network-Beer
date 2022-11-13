import React from "react";
import { useState } from "react";
import '../../../styles/EditWindow.css';
import { useDispatch, useSelector } from "react-redux";
import { infoReducer } from "../../../store/infoReducer";




const EditWindow = ({editWindowClasses, setEditWindowIsOpen}) =>{
    const [newName, setNewName] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.info);

    const changeNickName = (e) => {
        e.preventDefault();
        dispatch({type: 'CHANGE_INFO', payload: {nickName: newName, status: newStatus}});
        async function sendChanges(){
            let response = await fetch('/edit_profile', {
                method: 'POST',
                body: new FormData(e.target),
            });
            let result = await response.json()
        }
        sendChanges()
        setEditWindowIsOpen(false);
        setNewName('');
        setNewStatus('');
    }
    

    return (
        <div onClick={(e)=>{
            setEditWindowIsOpen(false);
            setNewName('');
            setNewStatus('');
        }} className={editWindowClasses.join(' ')}>
                        <div onClick = {e=>e.stopPropagation()} className="profile-main-ava-edit-Editwindow">
                            <div className="window-text">Редактирование профиля</div>
                            <form name = 'editProfile' action="">
                                <div className="window-edit">
                                    <div className="window-edit-nick">
                                        <div className="window-edit-nick-descr">
                                            Сменить имя
                                        </div>
                                        <div className="window-edit-nick-field">
                                            <input onChange = {(e)=> setNewName(e.target.value)} value = {newName} name="username" type="text"/>
                                        </div>
                                    </div>
                                    <div className="window-edit-status">
                                        <div className="window-edit-status-descr">
                                            Сменить статус
                                        </div>
                                        <div className="window-edit-status-field">
                                            <input onChange = {(e)=> setNewStatus(e.target.value)} value = {newStatus} name="description" type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="window-submit">
                                    <div className="window-submit-submit">
                                        <input onClick = {changeNickName} name = 'submitChanges' type="submit"/>
                                    </div>
                                    <div className="window-submit-clear">
                                        <input onClick={e=>{
                                            e.preventDefault();
                                            setNewName('');
                                            setNewStatus('');
                                }} name = 'reserChanges' type="reset"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
    )
}

export default EditWindow;