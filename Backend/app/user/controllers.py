import json

from flask import (
    Blueprint, render_template,
    request, Response,
    abort, redirect,
    url_for, session,
)
###
from flask_login import login_user, logout_user, login_required, current_user
from marshmallow import  ValidationError
from flask_socketio import send, emit, join_room

from app import socketio
from app.authentication.models import Users
from .friend_models import Friends, FriendshipRequest
from .user_models import UserInfo
from .utils import create_friends_list


user = Blueprint('user', __name__, template_folder='templates/user',
                 static_folder='static/user')


@user.route('/profile')
@login_required
def profile():
    name = current_user.name
    description = current_user.user_info[0].profile_description
    friends_list = create_friends_list(current_user.id)
    resp_dict = {"name": name, "description": description, "friends_list": friends_list}
    resp = json.dumps(resp_dict)
    return resp

@user.route('/exist', methods=['POST', 'GET'])
@login_required
def exist_user():
    resp = Response()
    data = request.json
    other_user = Users.get_user_by_name(data['other_user_name'])
    if user:
        friends_status = Friends.objects.get_friend_status(other_user.id, current_user.id)
        name = other_user.name
        description = other_user.user_info[0].profile_description
        friends_list = create_friends_list(other_user.id)
        resp_dict = {"name": name, "description": description, "friends_list": friends_list,
                     "is_exist": True, "friends_status": friends_status}
        resp.data = json.dumps(resp_dict)
        return resp
    else:
        resp.data = json.dumps({"is_exist": False})
        return resp

@user.route('/userInfo')
@login_required
def other_profile(name):
    name = current_user.name
    description = current_user.user_info[0].profile_description
    friends_list = create_friends_list(current_user.id)
    resp_dict = {"name": name, "description": description, "friends_list": friends_list}
    resp = json.dumps(resp_dict)
    return resp



"""SOCKET"""

@socketio.on('connect2')
def connect(data):
    emit("connect2", "test")
    # print(data)
    # room = current_user.name
    # join_room(room)
    #notifications = UserNotifications.get_notifications(current_user.user_info.id)
    #friend_list = Friends.objects.get_all_friends(current_user.id)

    #emit('friend_notification', )

@socketio.on('message')
def message(data):
    #print(f"\n\n{data}\n\n")
    send(data, broadcast=True)

@socketio.on('to-add-friend')
def friendship_request(names):
    to_user_name = names['other_user_name']
    current_user = Users.get_user_by_name(names['current_user_name'])
    to_user = Users.get_user_by_name(to_user_name)
    FriendshipRequest.create_friendship_request(from_user=current_user.id, to_user=to_user.id)
    send_data = current_user.name
    resp = {"name": current_user.name, "info_status": "friend_notification"}
    emit('update_friendship_info', resp, to=to_user.name)
    emit("to-add-friend", to=current_user.name)

@socketio.on('to-cancel-request')
def cancel_friendship_request(names):
    to_user_name = names['other_user_name']

    current_user = Users.get_user_by_name(names['current_user_name'])
    to_user = Users.get_user_by_name(to_user_name)

    friendship_request = FriendshipRequest.get_request(from_user=current_user.id, to_user=to_user.id)
    friendship_request.cansel()

    resp = {"name": current_user.name, "info_status": "cancel"}
    emit('update_friendship_info', resp, to=to_user.name)
    emit('to-cancel-request', to=current_user.name)


@socketio.on('to-answer')
def resp_friendship_request(data):
    from_user = Users.get_user_by_name(data['other_user_name'])
    current_user = Users.get_user_by_name(data['current_user_name'])
    f_request = FriendshipRequest.get_request(from_user=from_user.id, to_user=current_user.id)

    # ответ, добавить или нет
    if data['resp']:
        print(123)
        user_info_id = current_user.user_info[0].id
        friend_info_id = from_user.user_info[0].id
        f_request.accept(user_info_id=user_info_id, friend_info_id=friend_info_id)

        resp = {"name": current_user.name, "info_status": "friends", "resp": data['resp']}
        emit('update_friendship_info', resp, to=data['name'])
        emit('to-answer', data['resp'], to=current_user.name)
    else:
        f_request.reject()

        resp = {"name": current_user.name, "info_status": "reject"}
        emit('update_friendship_info', resp, to=data['name'])
        emit('to-answer', data['resp'], to=current_user.name)

@socketio.on('to-delete-friend')
def delete_friendship(names):
    to_user_name = names['other_user_name']

    current_user = Users.get_user_by_name(names['current_user_name'])
    friend = Users.get_user_by_name(to_user_name)

    Friends.objects.delete_friendship(user_id=current_user.id, friend_id=friend.id)
    resp = {"name": current_user.name, "info_status": "delete"}
    emit('update_friendship_info', resp, to=to_user_name)
    emit('to-delete-friend', to=current_user.name)

