from app import db, login


class UserInfo(db.Model):
    __tablename__ = "usersinfo"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    profile_description = db.Column(db.String(300), nullable=True)
    avatar_icon = db.Column(db.String(50), nullable=True)

    friends = db.relationship('Friends',
                              backref='userinfo')


