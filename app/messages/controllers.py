import json

from flask import (
    Blueprint, request, Response,
)
###
from flask_login import login_required, current_user
from flask_socketio import emit, join_room

from app.authentication.auth_models import Users
from .utils import create_list_from_messages
from .models.message_models import Chat, Messages


message = Blueprint('message', __name__)


@message.route('/get/messages')
def get_messages():
    resp = Response()
    data = request.json
    other_user = Users.get_user_by_name(data['other_user_name'])

    chat = Chat.get_chat(current_user.id, other_user.id)
    messages = Messages.get_messages_for_both(chat_id=chat.chat_id,
                                              user_1=current_user.id, user_2=other_user.id)

    m_list = create_list_from_messages(messages)
    resp.data = json.dumps({"messages": m_list})
    return resp
