import json

from flask import (
    Blueprint, request, Response,
)
###
from flask_login import login_required, current_user
from flask_socketio import emit, join_room

from app.authentication.auth_models import Users
from app.user.models.user_models import UserNotifications
from .models.notification_models import AcceptFriendshipNotifications
from app.user.models.friend_models import Friends
from .utils import create_friends_list, create_notifications_list
import app.user.sockets


user = Blueprint('user', __name__)


@user.route('/profile')
@login_required
def profile():
    name = current_user.name
    description = current_user.user_info[0].profile_description
    friends_list = create_friends_list(current_user.id)

    notifications = UserNotifications.get_all_notifications(current_user.id)
    notifications_list = create_notifications_list(notifications)
    print(name, description, notifications_list)

    resp_dict = {"name": name, "description": description,
                 "friends_list": friends_list, "notifications": notifications_list}
    resp = json.dumps(resp_dict)
    return resp

@user.route('/exist', methods=['POST', 'GET'])
@login_required
def exist_user():
    resp = Response()
    data = request.json
    other_user = Users.get_user_by_name(data['other_user_name'])
    if other_user:
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

@user.route('/delete/notification/accept', methods=['POST', 'GET'])
@login_required
def delete_accept_notification():
    data = request.json
    other_user = Users.get_user_by_name(data['other_user_name'])
    AcceptFriendshipNotifications.delete_notification(user_id=current_user.id, from_user_id=other_user.id)
    return Response(status=200)


