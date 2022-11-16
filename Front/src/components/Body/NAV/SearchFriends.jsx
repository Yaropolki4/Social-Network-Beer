import React, {useState} from "react";
import '../../../styles/SearchFriends.css'

const SearchFriends = (props) => {


    return (
        <div className = 'input-field'>
            <input onChange = {(e)=>props.setSearchValue(e.target.value)} value = {props.searchValue} type = 'text' placeholder="Поиск..."/>
        </div>
    )
}

export default SearchFriends;