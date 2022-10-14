
from marshmallow import ValidationError

from app.authentication.validation import NameSchema
from app.authentication.models import Users
from app import db, login


class UserInfo(db.Model):
    __tablename__ = "usersinfo"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    profile_description = db.Column(db.String(300), nullable=True, default="Пиво течет во мне, и я един с пивом")
    avatar_icon = db.Column(db.String(50), nullable=True)

    friends = db.relationship('Friends',
                              backref='userinfo')

    @staticmethod
    def create_user_info_default(user_id: int):
        user_info = UserInfo(user_id=user_id)
        db.session.add(user_info)
        db.session.commit()

    def edit_user_profile(self, name: str, description: str):

        NameSchema().load({"name": name})

        self.profile_description = description

        if not Users.query.filter_by(name=name).first():
            self.user.name = name
            db.session.commit()
        else:
            raise ValidationError("Пользователь с таким именем существует")

