from flask import (
    Blueprint, render_template,
    request, redirect,
    abort, Response,
    url_for,
)

placemarks = Blueprint('placemarks', __name__, url_prefix='placemarks')

@placemarks.route('/add')
def add_placemarks():
    pass