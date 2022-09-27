from flask import (
    Blueprint,
    request,
    abort,
    url_for,
)
from flask_login import login_user, logout_user
from  marshmallow import  ValidationError


user_profile = Blueprint('user_profile', __name__, url_prefix="/profile")

@user_profile.route('/')
def get_user_profile():
    pass

