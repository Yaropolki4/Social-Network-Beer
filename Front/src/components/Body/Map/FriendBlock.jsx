import React, {useState, useEffect} from "react";


const FriendBlock = (props) => {

    const [invited, setInvited] = useState(false);
    const [friendBlockClasses, setFriendBlockClasses] = useState(['friend-block']);
    useEffect(() => {
        if(invited) setFriendBlockClasses(['friend-block', 'invited']);
        else setFriendBlockClasses(['friend-block']);
    }, [invited]);

    return(
    <div onClick = {() => {
        if(!invited){
            props.setInvitedFriends([...props.invitedFriends, props.children]);
            setInvited(true);
        }
        if(invited) {
            props.setInvitedFriends(props.invitedFriends.filter(item => item!==props.children));
            setInvited(false);
        }
    }} className={friendBlockClasses.join(' ')}>
        <span>{props.children}</span>
    </div>
    )
}

export default FriendBlock;
