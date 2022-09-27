from flask_login import UserMixin, login_user
from marshmallow import ValidationError
from werkzeug.security import check_password_hash, generate_password_hash

from .validation import RegisterSchema
from app import db, login