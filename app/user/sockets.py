import json

from flask import (
    request, Response,
)
from flask_socketio import emit, join_room

from app import socketio
from app.authentication.auth_models import Users
from .models.user_models import UserNotifications
from .models.notification_models import AcceptFriendshipNotifications
from app.user.models.friend_models import Friends, FriendshipRequest


@socketio.on('connection')
def connect(data):
    current_user = Users.get_user_by_name(data['current_user_name'])
    room = current_user.name
    join_room(room)

@socketio.on('to-add-friend')
def friendship_request(names: dict):
    current_user = Users.get_user_by_name(names['current_user_name'])
    to_user = Users.get_user_by_name(names['other_user_name'])

    FriendshipRequest.create_friendship_request(from_user=current_user.id, to_user=to_user.id)

    resp = {"name": current_user.name, "info_status": "received-friend-notification"}
    emit('update_friendship_info', resp, to=to_user.name)
    emit("to-add-friend", to=current_user.name)

@socketio.on('to-cancel-request')
def cancel_friendship_request(names):
    current_user = Users.get_user_by_name(names['current_user_name'])
    to_user = Users.get_user_by_name(names['other_user_name'])

    friendship_request = FriendshipRequest.get_request(from_user=current_user.id, to_user=to_user.id)
    friendship_request.cansel()

    resp = {"name": current_user.name, "info_status": "friend-require-was-canceled"}
    emit('update_friendship_info', resp, to=to_user.name)
    emit('to-cancel-request', to=current_user.name)


@socketio.on('to-answer')
def answer_friendship_request(data):
    from_user = Users.get_user_by_name(data['other_user_name'])
    current_user = Users.get_user_by_name(data['current_user_name'])
    f_request = FriendshipRequest.get_request(from_user=from_user.id, to_user=current_user.id)

    # ответ, добавить или нет
    if data['resp']:
        f_request.accept()
        AcceptFriendshipNotifications.create_notification(user_id=from_user.id, from_user_id=current_user.id)

        resp = {"name": current_user.name, "info_status": "friend-require-was-accepted", "resp": data['resp']}
        emit('update_friendship_info', resp, to=from_user.name)
        emit('to-answer', data['resp'], to=current_user.name)
    else:
        f_request.reject()

        resp = {"name": current_user.name, "info_status": "friend-require-was-rejected"}
        emit('update_friendship_info', resp, to=from_user.name)
        emit('to-answer', data['resp'], to=current_user.name)

@socketio.on('to-delete-friend')
def delete_friendship(names):
    to_user_name = names['other_user_name']

    friend = Users.get_user_by_name(to_user_name)
    current_user = Users.get_user_by_name(names['current_user_name'])

    Friends.objects.delete_friendship(user_id=current_user.id, friend_id=friend.id)
    resp = {"name": current_user.name, "info_status": "friend-deleted-you"}
    emit('update_friendship_info', resp, to=to_user_name)
    emit('to-delete-friend', to=current_user.name)

@socketio.on('delete-accept-notification')
def delete_accept_notification(names):
    from_user_name = names['other_user_name']

    from_user = Users.get_user_by_name(from_user_name)
    current_user = Users.get_user_by_name(names['current_user_name'])