
from app import db



class AcceptFriendshipNotifications(db.Model):
    __tablename__ = "accept_friendship_notification"

    user_id = db.Column(db.Integer, db.ForeignKey("user_notification.user_id"), nullable=False, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, primary_key=True)
    mark_viewed = db.Column(db.Boolean, nullable=False, default=True)

    @staticmethod
    def create_notification(user_id: int, from_user_id: int):
        notifications = AcceptFriendshipNotifications(user_id=user_id, from_user_id=from_user_id)
        db.session.add(notifications)
        db.session.commit()

    @staticmethod
    def delete_notification(user_id: int, from_user_id: int):
        notifications = AcceptFriendshipNotifications.query.filter_by(user_id=user_id,
                                                                      from_user_id=from_user_id).first()
        if notifications:
            db.session.delete(notifications)
            db.session.commit()