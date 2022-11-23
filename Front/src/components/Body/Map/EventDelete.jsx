import React from "react";
import '../../../styles/EventDelete.css'
import { useDispatch } from "react-redux";

const EventDelete = ({coords}) => {
    const dispatch = useDispatch();
    return (
        <div className="event-delete">
            <button onClick = {() => dispatch({type: 'DELETE_MARKER', payload: coords})} className = 'event-delete-button'>Удалить мероприятие</button>
        </div>
    )
}

export default EventDelete 