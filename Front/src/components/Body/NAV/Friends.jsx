import React, {useState, useEffect} from 'react';
import '../../../styles/Friends.css';
import FriendItem from '../Profile/FriendItem';
import {useSelector } from "react-redux";
import SearchFriends from './SearchFriends';
import { useMemo } from 'react';
import { json } from 'react-router-dom';

const Friends = ({stateFriendsIsOpen}) => {

    const [searchValue, setSearchValue] = useState('');
    const filterFriends = (friends) => {
        return friends.filter(item => {
            return item.nickName.toLowerCase().startsWith(searchValue.toLowerCase())
        });
    }
    const friends = useSelector(state => state.friends.friends);
    const filteredFriends = filterFriends([...friends]);
    const [userList, setUserList] = useState([]);
    
    
    
    async function getUserNames(){
        let respone = await fetch('/search_users', {
            method: 'POST',
            body: JSON.stringify({name: searchValue}),
        });
        let result = await respone.json();
        //const data = result.map(item => item.name);
        setUserList(result.user_list);
    };
    const filteredUsers = [...userList].filter(item => {return item.toLowerCase().startsWith(searchValue.toLocaleLowerCase())});
    useEffect(() => {
        if(stateFriendsIsOpen[0]) getUserNames();
    }, [searchValue]);
    return (
        <div className = 'nav-friends'>
            <SearchFriends searchValue = {searchValue} setSearchValue = {setSearchValue}/>
            <div className = 'searched-friends'>Друзья</div>
            {filteredFriends.map((friend)=> {
                return <FriendItem  nickName = {friend.nickName} online = {friend.online} key = {friend.nickName}/>
            })}
            {searchValue && <div className = 'searched-users'>Глобальный поиск</div>}
            {searchValue && filteredUsers.map((name)=> {
                return <FriendItem nickName = {name} online = {true} key = {name}/>
            })}
        </div>
    )
}

export default Friends
