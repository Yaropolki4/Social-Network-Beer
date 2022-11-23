import enum

from .friend_models import FriendshipRequest
from app.authentication.auth_models import Users
from app import db, login


class UserInfo(db.Model):
    __tablename__ = "usersinfo"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    profile_description = db.Column(db.String(300), nullable=True, default="Пиво течет во мне, и я един с пивом")
    avatar_icon = db.Column(db.String(50), nullable=True)


    @staticmethod
    def create_user_info_default(user_id: int):
        user_info = UserInfo(user_id=user_id)
        db.session.add(user_info)
        db.session.commit()

    def edit_user_profile(self, name: str, description: str):

        NameSchema().load({"name": name})

        self.profile_description = description

        if not Users.get_user_by_name(name):
            self.user.name = name
            db.session.commit()
        else:
            raise ValidationError("Пользователь с таким именем существует")

@enum.unique
class NotificationType(enum.Enum):
    friend_request = "friend_request"
    friend_accepted = "friend_accepted"
    meeting  = "meeting"

class UserNotifications(db.Model):
    __tablename__ = "user_notification"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, primary_key=True)

    accept_friendship_notification = db.relationship('AcceptFriendshipNotifications',
                                                     backref='user_notification')

    friendship_request_notification = db.relationship('FriendshipRequest',
                                                     backref='user_notification')

    @staticmethod
    def create_notifications(user_id: int):
        user_notification = UserNotifications(user_id=user_id)
        db.session.add(user_notification)
        db.session.commit()

    @staticmethod
    def get_all_notifications(user_id) -> dict:
        user_notification = UserNotifications.query.filter_by(user_id=user_id).first()
        notifications_dict = {}

        accept_notification = user_notification.accept_friendship_notification
        if accept_notification:
            notifications_dict['accept_friend_request'] = accept_notification

        friendship_notifications = user_notification.friendship_request_notification
        if friendship_notifications:
            notifications_dict['friend_request'] = friendship_notifications

        return notifications_dict


