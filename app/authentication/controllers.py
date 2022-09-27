import json

from flask import (
    Blueprint, render_template,
    request, redirect,
    abort, Response,
    url_for,
)
from flask_login import login_user, logout_user, current_user, login_required
from  marshmallow import  ValidationError

from .models import Users

authentication = Blueprint('authentication', __name__, template_folder='templates/authentication',
                           static_folder='static/authentication')


@authentication.route('/login', methods=["GET", "POST", "OPTIONS"])
def auth():
    res = Response()
    res.headers["Access-Control-Allow-Origin"] = "*"

    if request.method == 'POST':

        if "login" in request.form:
            login_name = request.form.get('login-name')
            psw = request.form.get('password')
            rm = True if request.form.get('remember') else False

            try:
                user = Users.get_user_for_login(login_name, psw)
                login_user(user, remember=rm)
                return redirect(url_for('.index')) ##############
            except ValidationError as err:
                print(err.messages)
                return {"error": err.messages}

        elif "registration" in request.form :
            email = request.form.get('email')
            name = request.form.get('name')
            psw = request.form.get('password')
            repeat_psw = request.form.get("repeat password")

            try:
                Users.create_user(name, email, psw, repeat_psw)
                return redirect(url_for('.auth'))
            except ValidationError as err:
                print(err.messages)
                return {"error": err.messages}

    if request.method == 'GET':
        print(res.headers)
        return {"Hui": 123}#render_template('login.html')

@authentication.route('/logout', methods=["POST", "GET"])
def logout():
    logout_user()
    return redirect(url_for('index'))

########################

@authentication.route('/')
@authentication.route('/index')
@login_required
def index():
    return render_template('main.html')




