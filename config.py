import os
from dotenv import load_dotenv


# basedir = os.path.abspath(os.path.dirname(__file__))
# load_dotenv(os.path.join(basedir, '.env'))

# dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
# if os.path.exists(dotenv_path):
#     load_dotenv(dotenv_path)

class Config():
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:12345@localhost/mero_db"
    SECRET_KEY = "Secret_key_123321_lasfkmsamsa"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

