import './styles/App.css';
import React, {useState, useMemo, useEffect} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Nav from './components/Body/NAV/Nav';
import {AuthContext} from './context/index';
import AppRouter from './components/AppRouter';
import { useSelector, useDispatch } from 'react-redux';
import socket from './socket'


  const App = React.memo(function App(){



  let auth = 0;
  if(localStorage.getItem('test')) auth = localStorage.getItem('test');
  const [isAuth, setIsAuth] = useState();
    useEffect(() => {
      if(auth==1){
        setIsAuth(true);
      }
      else{
        setIsAuth(false);
      }
    })
  const stateFriendsIsOpen = useState(false);
  const stateNotificationsIsOpen = useState(false);
  
  return (
    
    <AuthContext.Provider value = {{isAuth, setIsAuth}}>
      <BrowserRouter>
        <div className = "body" onClick = {()=>{stateFriendsIsOpen[1](false); stateNotificationsIsOpen[1](false)}}>
          {isAuth ?<Nav stateFriendsIsOpen = {stateFriendsIsOpen} stateNotificationsIsOpen = {stateNotificationsIsOpen}/>
          : <div></div>}
          <AppRouter/>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
})


export default App;
