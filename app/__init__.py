from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_cors import CORS

from config import Config


db = SQLAlchemy()
login = LoginManager()
migrate = Migrate()
socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    # cors = CORS(app)
    db.init_app(app)
    login.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app)

    login.login_view = 'authentication.auth'

    import app.authentication.controllers as auth
    import app.user.controllers as user
    import app.messages.controllers as messages

    app.register_blueprint(auth.authentication)
    app.register_blueprint(user.user)
    app.register_blueprint(messages.message)

    return app