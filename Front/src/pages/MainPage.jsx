import "leaflet/dist/leaflet.css";
import '../styles/MainPage.css';
import React, {useState} from 'react';
import LoadingWindow from '../components/LoadingWindow';
import { useEffect } from 'react';
import Map from "../components/Map";
import { useDispatch } from "react-redux";


function MainPage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(()=>{setIsLoading(false)}, 500)
  }, [window.location.href])
  return (
    <div>
    {isLoading && <LoadingWindow/>}
    <div className = 'map-container' onClick = {() => dispatch({type: 'CHANGE_EVENT_STATE', payload: false})}>
      <Map onClick = {(e) => console.log(1)}/>
    </div>
    </div>
  )

}


export default MainPage;
