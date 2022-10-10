# import datetime
#
# from flask_login import UserMixin, login_user
# from marshmallow import ValidationError
# from werkzeug.security import check_password_hash, generate_password_hash
#
# from .validation import RegisterSchema
# from app import db, login
#
#
# class FriendshipRequest(db.Model):
#
#     from_user = db.Column(db.Integer, db.ForeingKey("userinfo.user_id"),
#                           nullable=False)
#     to_user = db.Column(db.Integer, db.ForeingKey("userinfo.user_id"),
#                         nullable=False)
#     message = db.Column(db.String(100), nullable=True)
#
#     def accept(self):
#         """Принять запрос в друзья"""
#         Friends.objects.create_friendship(user_id=self.from_user, friend_id=self.to_user)
#
#         self.delete()
#
#         # Для удаления зеркальных запросов(если такие вообще возможны)
#         FriendshipRequest.query.filter_by(from_user=self.to_user,
#                                           to_user=self.from_user).delete()
#         db.session.commit()
#         return True
#
#     def reject(self):
#         self.delete()
#         db.session.commit()
#         return True
#
#     def cansel(self):
#         self.delete()
#         db.session.commit()
#         return True
#
#
#
# class FriendshipManager():
#
#     def create_friendship(self, user_id, friend_id):
#         friendship = Friends(user_id=user_id, friend_id=friend_id)
#         friendship_reverse = Friends(user_id=friend_id, friend_id=user_id)
#         db.session.add(friendship, friendship_reverse)
#         db.session.commit()
#
# class Friends(db.Model):
#     __tablename__ = "friends"
#
#     user_id = db.Column(db.Integer, db.ForeingKey("userinfo.user_id"), nullable=False)
#     friend_id = db.Column(db.Integer, db.ForeingKey("userinfo.user_id"), nullable=False)
#     created_time = db.Column(db.Datetime(timezone=True), default=datetime.datetime.utcnow)
#
#     objects = FriendshipManager()