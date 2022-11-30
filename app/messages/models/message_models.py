import enum
from datetime import datetime
from app.authentication.auth_models import Users
from app import db, login


class Chat(db.Model):
    __tablename__ = "chat"

    chat_id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_one_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_two_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    date_create = db.Column(db.DateTime, default=datetime.utcnow())

    user_one = db.relationship("Users")
    user_two = db.relationship("Users")

    @staticmethod
    def get_chat(user_1: int, user_2: int):
        return Chat.query.filter_by(user_one_id=user_1, user_two_id=user_2).first()

    @staticmethod
    def create_chat(user_1: int, user_2: int):
        chat = Chat(user_one_id=user_1, user_two_id=user_2)
        db.session.add(chat)
        db.session.commit()
        return chat

class Messages(db.Model):
    __tablename__ = "messages"

    message_id = db.Column(db.Integer, primary_key=True, nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey("chat.chat_id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.String(200))
    date_create = db.Column(db.DateTime, default=datetime.utcnow)

    chat = db.relationship("Chat")
    user = db.relationship("Users")

    @staticmethod
    def create_message(chat_id, user_id, content):
        message = Messages(chat_id=chat_id, user_id=user_id, content=content)
        # message_status = MessageStatus(message_id=message.message_id, user_id=user_id)
        db.session.add(message)
        ######## мб не правильно
        # db.session.add(message_status)
        db.session.commit()
        return message

    @staticmethod
    def get_messages_for_both(chat_id, user_1, user_2) -> dict:
        messages = Chat.query.filter_by(Messages.chat_id==chat_id, Messages.user_id.in_(user_1, user_2)).\
            order_by(Messages.date_create).all()
        return messages


# class messageStatus(enum):
#     deleted_for_user = "deleted_for_user"
#     deleted_for_all = "deleted_for_all"


class MessageStatus(db.Model):
    __tablename__ = "message_status"

    message_id = db.Column(db.Integer, db.ForeignKey("messages.message_id"),primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    is_read = db.Column(db.Boolean, nullable=False, default=False)

    message = db.relationship('Messages')
    user = db.relationship('Users')

