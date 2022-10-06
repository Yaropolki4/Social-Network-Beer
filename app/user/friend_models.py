import datetime

from flask_login import UserMixin, login_user
from marshmallow import ValidationError
from werkzeug.security import check_password_hash, generate_password_hash

from .validation import RegisterSchema
from app import db, login


class FriendshipRequest(db.Model):

    from_user = db.Column(db.Integer, db.ForeingKey("users.id"), nullable=False)
    to_user = db.Column(db.Integer, db.ForeingKey("users.id"), nullable=False)

    message = db.Column(db.String(100), nullable=True)

class Friend(db.Model):

    from_user = db.Column(db.Integer, db.ForeingKey("users.id"), nullable=False)
    to_user = db.Column(db.Integer, db.ForeingKey("users.id"), nullable=False)
    created_time = db.Column(db.Datetime(timezone=True), default=datetime.datetime.utcnow)