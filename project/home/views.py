#################
#### imports ####
#################

from project import app, db
from project.models import Food
from flask import flash, redirect, session, url_for, render_template, Blueprint
from functools import wraps

################
#### config ####
################

home_blueprint = Blueprint(
    'home', __name__,
    template_folder='templates'
)


##########################
#### helper functions ####
##########################


def login_required(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return test(*args, **kwargs)
        else:
            flash('You need to login first.')
            return redirect(url_for('users.login'))
    return wrap


################
#### routes ####
################

@home_blueprint.route('/order')
@login_required
def order():
    return render_template('order.html')  # render a template
