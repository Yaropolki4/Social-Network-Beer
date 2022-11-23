import React from "react";
import '../../../styles/EventDescription.css';

const EventDescription = ({item}) => {
    return (
        <div className = 'event-description'>
            <div className="event-title">
                {item.title}
            </div>
            <div className="event-descr">
            {item.descr}
            </div>
            <div className="event-author">
                Организатор: {item.author}
            </div>
        </div>
    )
}

export default EventDescription