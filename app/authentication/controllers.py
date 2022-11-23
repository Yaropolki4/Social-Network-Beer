import json

from flask import (
    Blueprint, request, redirect,
    Response,
    url_for,
)
from flask_login import login_user, logout_user, current_user
from marshmallow import  ValidationError

from .auth_models import Users
from app.user.models.user_models import UserInfo, UserNotifications

authentication = Blueprint('authentication', __name__)


@authentication.route('/login', methods=["GET", "POST"])
def auth():
    resp = Response()
    resp_dict = {"is_authenticated": False}
    if request.method == "GET":
        if current_user.is_authenticated:
            resp.data = json.dumps({"is_authenticated": True})
            return resp
        else:
            resp.data = json.dumps(resp_dict)
            return resp
    # else:
        # if request.method == 'GET':
        #     return render_template('login.html')

    if request.method == 'POST':
        if "login" in request.form:
            login_name = request.form.get('login-name')
            psw = request.form.get('password')
            rm = True if request.form.get('remember') else False

            try:
                user = Users.get_user_for_login(login_name, psw)
                login_user(user, remember=rm)
                resp_dict["url-redirect"] = True
                resp.data = json.dumps(resp_dict)
                return resp
            except ValidationError as err:
                print(err.messages)
                resp_dict["error"] = err.messages
                resp.data = json.dumps(resp_dict)
                return resp

        elif "registration" in request.form :
            email = request.form.get('email')
            name = request.form.get('name')
            psw = request.form.get('password')
            repeat_psw = request.form.get("repeat-password")
            try:

                user = Users.create_user(name, email, psw, repeat_psw)
                UserInfo.create_user_info_default(user.id)
                UserNotifications.create_notifications(user.id)

                login_user(user, remember=True)
                resp.data = json.dumps({"url-redirect": url_for('user.index')})
                return resp
            except ValidationError as err:
                print(err.messages)
                resp.data = json.dumps({"error": err.messages})
                # print(resp.data)
                return resp

@authentication.route('/logout', methods=["POST", "GET"])
def logout():
    resp = Response()
    logout_user()
    return resp

########################



