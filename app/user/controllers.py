from flask import (
    Blueprint, render_template,
    request,
    abort,
    url_for,
)
###
from flask_login import login_user, logout_user, login_required, current_user
from  marshmallow import  ValidationError
from flask_socketio import send, emit, join_room

from app import socketio
from .friend_models import Friends, FriendshipRequest
from .user_models import UserInfo


user = Blueprint('user', __name__, template_folder='templates/user',
                 static_folder='static/user')

@user.route('/')
@user.route('/index')
@login_required
def index():
    return render_template('main.html')

@user.route('/profile')
@login_required
def profile():
    name = current_user.name
    return render_template("profile.html", name=name)

"""SOCKET"""
@socketio.on('message')
def message(data):
    #print(f"\n\n{data}\n\n")
    send(data, broadcast=True)

@socketio.on('join')
def join(data):
    join_room(data['room'])
    send({'msg': data['name'] + ' законектился.'}, room=data['room'])
