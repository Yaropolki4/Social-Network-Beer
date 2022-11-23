import React from 'react'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import EventWindow from './Body/Map/EventWindow';
import '../styles/MainPage.css';
import { useSelector, useDispatch } from 'react-redux';
import EventDescription from './Body/Map/EventDescription';
import icon from '../logo.svg';
import icon2 from '../logo2.svg';
import EventDelete from './Body/Map/EventDelete';


const Map = () => {
    const myIcon1 = L.icon({
      iconUrl: icon,
      iconSize: [60,59]
    });
    const myIcon2 = L.icon({
      iconUrl: icon2, 
      iconSize: [80,80],
    })
    const markers = useSelector(state => state.markers.markers);
    const nickName = useSelector(state => state.info.nickName);
    console.log(markers);
    const [windowCoords, setWindowCoords] = useState(undefined);
    const [position, setPosition] = useState([55.709028, 37.517944])
    function LocationMarker() {
        const map = useMapEvents({
          dblclick(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
          },
        });
      
       
      }

  return (
    <div onClick = {(e)=>{
        if(!e.target.closest('.event-window')) setWindowCoords(undefined);
    }}
     onDoubleClick = {(e)=>{
        if(!e.target.closest('.event-window')) setWindowCoords([e.clientX, e.clientY]);
      }}> 
        {windowCoords && <EventWindow setWindowCoords = {setWindowCoords} position = {position} windowCoords = {windowCoords}/>}
        
    <>
      <MapContainer className = 'map'
        center={[55.709028, 37.517944]} 
        zoom={15} 
        zoomControl={false} 
        style={{ height: '100vh', width: '100%', zIndex: 0}}
      >
        <TileLayer
          attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(item => {return item.author != nickName ? <Marker icon = {myIcon1} position={item.coords} key = {item.coords[0]}>
              <Tooltip>
                <EventDescription item = {item}/>
              </Tooltip>
          </Marker> : <Marker icon = {myIcon2} position = {item.coords} key = {item.coords[0]}>
            <Tooltip>
              <EventDescription item = {item}/>
            </Tooltip>
            <Popup>
              <EventDelete coords = {item.coords}/>
            </Popup>
          </Marker>})}
        <LocationMarker />
      </MapContainer>
    </>
    </div>
  )
}

export default Map