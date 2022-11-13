import '../styles/App.css' ;
import Profile from '../components/Body/Profile/Profile';
import LoadingWindow from '../components/LoadingWindow';
import React from 'react';
import {useState, useEffect} from 'react';

function ProfilePage() {
  const isMyProfile = true;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=>{setIsLoading(false)}, 500)
  }, [window.location.href])
  return (
    <div>
      {isLoading && <LoadingWindow/>}
      <Profile isMyProfile = {isMyProfile}/>
    </div>
  )

}


export default ProfilePage;
