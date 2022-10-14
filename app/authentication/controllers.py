import json

from flask import (
    Blueprint, render_template,
    request, redirect,
    abort, Response,
    url_for,
)
from flask_login import login_user, logout_user, current_user, login_required
from marshmallow import  ValidationError

from .models import Users
from app.user.user_models import UserInfo

authentication = Blueprint('authentication', __name__, template_folder='templates/authentication',
                           static_folder='static/authentication')


@authentication.route('/login', methods=["GET", "POST"])
def auth():
    resp = Response()
    if current_user.is_authenticated:
        return redirect(url_for('.index'))
    else:
        if request.method == 'GET':
            return render_template('login.html')

        elif request.method == 'POST':
            if "login" in request.form:
                login_name = request.form.get('login-name')
                psw = request.form.get('password')
                rm = True if request.form.get('remember') else False

                try:
                    user = Users.get_user_for_login(login_name, psw)
                    login_user(user, remember=rm)
                    resp.data = json.dumps({"url-redirect": url_for('user.index')})
                    return resp
                except ValidationError as err:
                    print(err.messages)
                    resp.data = json.dumps({"error": err.messages})
                    # print(resp.data)
                    return resp

            elif "registration" in request.form :
                email = request.form.get('email')
                name = request.form.get('name')
                psw = request.form.get('password')
                repeat_psw = request.form.get("repeat-password")
                try:

                    user = Users.create_user(name, email, psw, repeat_psw)
                    UserInfo.create_user_info_default(user.id)

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
    logout_user()
    return redirect(url_for('user.index'))

########################



