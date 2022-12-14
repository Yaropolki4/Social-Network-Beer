from app import create_app
from app import socketio

app = create_app()

if __name__ == '__main__':
    socketio.run(app, allow_unsafe_werkzeug=True, debug=True, host='0.0.0.0', port=4567)