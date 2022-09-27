from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from  flask_migrate import Migrate

from config import Config


db = SQLAlchemy()
login = LoginManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login.init_app(app)
    migrate.init_app(app, db)

    login.login_view = 'authentication.auth'

    import app.authentication.controllers as auth

    app.register_blueprint(auth.authentication)

    return app