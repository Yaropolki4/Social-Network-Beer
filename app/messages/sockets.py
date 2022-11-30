import json

from flask import (
    request, Response,
)
from flask_socketio import emit, join_room

from app import socketio
from app.authentication.auth_models import Users
from .models.message_models import Chat, Messages
from app.user.models.friend_models import Friends, FriendshipRequest


@socketio.on('send-message')
def send_message(data: dict):
    current_user = Users.get_user_by_name(data['from_user_name'])
    to_user = Users.get_user_by_name(data['to_user_name'])

    chat = Chat.get_chat(current_user, to_user)
    if not chat:
        chat = Chat.create_chat(current_user, to_user)

    content = data['message']
    message = Messages.create_message(chat.chat_id, current_user.id, content)

    resp = {'from_user': current_user.id, 'to_user': to_user.id, 'message': content,
            'date': message.date_create}
    emit('send-message', resp, to=to_user.id)

# @socketio.on('check-message')
# def check_message(data: dict):
#



