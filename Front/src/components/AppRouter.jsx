import React, {useContext} from "react";
import ProfilePage from '../pages/ProfilePage';
import MainPage from '../pages/MainPage';
import Auth from '../pages/Auth';
import Error from "../pages/Error";
import UserProfilePage from "../pages/UserProfilePage";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { AuthContext } from "../context";

const AppRouter = (props) => {
    const {isAuth, setIsAuth}= useContext(AuthContext);
    return (
        <div>
         {isAuth===true && 
        <Routes>    
            <Route path = '/main' element = {<MainPage/>}/>
            <Route path = '/profile' element = {<ProfilePage/>}/> 
            <Route path = '/profile/:id' element = {<UserProfilePage/>}/>
            <Route path = '/error' element = {<Error/>}/>
            <Route path='/*' element = {<Navigate to = "/main" replace/>}/> 
        </Routes>}
        {isAuth===false &&
        <Routes>
            <Route path = '/auth' element = {<Auth/>}/>
            <Route path='/*' element = {<Navigate to = "/auth" replace/>}/> 
        </Routes>} 
        </div>
    )
}

export default AppRouter;