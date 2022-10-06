from flask_login import UserMixin, login_user
from marshmallow import ValidationError
from werkzeug.security import check_password_hash, generate_password_hash

from .validation import RegisterSchema
from app import db, login


class UserInfo(db.Model):
    __tablename__ = "users_info"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.String(20), db.ForeingKey("users.id"), nullable=False)
    profile_description = db.Column(db.String(300), nullable=True)
    avatar_icon = db.Column(db.String(50), nullable=True)
    #friends =


