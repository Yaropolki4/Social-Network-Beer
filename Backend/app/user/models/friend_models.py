import datetime

from sqlalchemy import or_

from app import db, login


class FriendshipRequest(db.Model):
    """
    Запрос в друзья
    from_user и to_user это id соответствующих юзеров
    """

    from_user_id = db.Column(db.Integer, db.ForeignKey("users.id"),
                          primary_key=True, nullable=False)
    to_user = db.Column(db.Integer, db.ForeignKey("user_notification.user_id"),
                        primary_key=True, nullable=False)
    message = db.Column(db.String(100), nullable=True)

    @staticmethod
    def create_friendship_request(from_user_id: int, to_user: int):
        """
        Создание запроса в друзья

        :param from_user: int
        :param to_user: int
        :return:
        """

        if from_user_id==to_user:
            return False
        req_1 = FriendshipRequest.query.filter_by(from_user_id=from_user_id, to_user=to_user).first()
        req_2 = FriendshipRequest.query.filter_by(from_user_id=to_user, to_user=from_user_id).first()
        if req_1 or req_2:
            return False
        else:
            friendship_request = FriendshipRequest(from_user_id=from_user_id, to_user=to_user)
            db.session.add(friendship_request)
            db.session.commit()
            return True

    @staticmethod
    def get_request(from_user_id: int, to_user: int):
        return FriendshipRequest.query.filter_by(from_user_id=from_user_id, to_user=to_user).first()

    @staticmethod
    def get_all_request_to_user(to_user: int):
        return FriendshipRequest.query.filter_by(to_user=to_user).all()

    def accept(self):
        """
        Принять запрос в друзья

        :param user_info_id: int
        :param friend_info_id: int
        :return:
        """
        Friends.objects.create_friendship(user_id=self.from_user_id, friend_id=self.to_user)

        db.session.delete(self)
        db.session.commit()
        return True

    def reject(self):
        db.session.delete(self)
        db.session.commit()
        return True

    def cansel(self):
        db.session.delete(self)
        db.session.commit()
        return True



class FriendshipManager():

    def create_friendship(self, user_id, friend_id):
        friendship = Friends(user_id=user_id, friend_id=friend_id)
        friendship_reverse = Friends(user_id=friend_id, friend_id=user_id)

        db.session.add(friendship)
        db.session.add(friendship_reverse)
        db.session.commit()

    def delete_friendship(self, user_id, friend_id):
        friendship = Friends.query.filter(Friends.user_id.in_([user_id, friend_id]),
                                          Friends.friend_id.in_([friend_id, user_id])).all()
        if friendship:
            db.session.delete(friendship[0])
            db.session.delete(friendship[1])
            db.session.commit()
            return True
        else:
            return False

    def get_all_friends(self, user_id):
        friends = Friends.query.filter_by(user_id=user_id).all()
        return friends

    def get_friend_status(self, user1_id, user2_id):
        if Friends.query.filter_by(user_id=user1_id, friend_id=user2_id).first():
            return "friend"
        elif FriendshipRequest.get_request(user1_id, user2_id):
            return "waiting-answer"
        elif FriendshipRequest.get_request(user2_id, user1_id):
            return "request-was-sent"
        else:
            return "not-friend"

class Friends(db.Model):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"),  nullable=False)
    friend_id = db.Column(db.Integer,  nullable=False)
    created_time = db.Column(db.DateTime(timezone=True), default=datetime.datetime.utcnow)

    objects = FriendshipManager()

