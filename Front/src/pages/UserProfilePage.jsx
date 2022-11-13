import '../styles/UserProfilePage.css';
import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Profile from '../components/Body/Profile/Profile';
import LoadingWindow from '../components/LoadingWindow';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserProfilePage() {


  const dispatch = useDispatch();
  const navigate = useNavigate();
    const url = new URL(window.location.href);
    let validNick = url.pathname.split('/').pop();
    let [otherFriends, setOtherFriends] = useState([]);
    let [nickName, setNickName] = useState('');
    let [userStatus, setUserStatus] = useState('');

    async function validateNick(){
        let response = await fetch('/exist', {
          method: 'POST',
          body: JSON.stringify({other_user_name: validNick}),
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        });
        let result = await response.json();
        if(!result['is_exist']) {
          navigate('/error');
        }
        else{
          setNickName(result.name);
          setUserStatus(result.description);
          let otherFriendsList = result.friends_list;
          console.log(result.friends_status);
          dispatch({type: 'change-status', payload: result.friends_status});
          let otherFriends_ = [];
          for (let item of otherFriendsList){
            otherFriends_.push({nickName: item, online: true, id: item});
          }
          setOtherFriends(otherFriends);
        }
    }



    useEffect(() => {
      validateNick();
    })
    const {id} = useParams();
    const otherUserInfo = {nickName: nickName, status: userStatus};
    const isMyProfile = false;



    const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=>{setIsLoading(false)}, 500)
  }, [id, window.location.href]);
  return (
    <div>
      {isLoading && <LoadingWindow/>}
      <Profile isMyProfile = {isMyProfile} otherFriends = {otherFriends} otherUserInfo = {otherUserInfo}/>
    </div>
  )

}


export default UserProfilePage;
