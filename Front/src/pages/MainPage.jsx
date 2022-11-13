import '../styles/App.css';
import React, {useState} from 'react';
import LoadingWindow from '../components/LoadingWindow';
import { useEffect } from 'react';

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=>{setIsLoading(false)}, 500)
  }, [window.location.href])
  return (
    <div>
      {isLoading && <LoadingWindow/>}
      <div style = {{textAlign: 'center'}}>я карта</div>
    </div>
  )

}


export default ProfilePage;
