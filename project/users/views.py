#################
#### imports ####
#################

from flask import flash, redirect, render_template, request, \
    session, url_for, Blueprint
from functools import wraps
from project.form import LoginForm
from project.models import User
from project import db


################
#### config ####
################

users_blueprint = Blueprint(
    'users', __name__,
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
            flash('Please to login first.')
            return redirect(url_for('users.home'))
    return wrap


################
#### routes ####
################

# route for handling the login page logic
@users_blueprint.route('/', methods=['GET', 'POST'])
def home():
    error = None
    form = LoginForm(request.form)
    if request.method == 'POST':
        if form.validate_on_submit():
            user = User.query.filter_by(email=request.form['email']).first()
            if user is not None and (int(user.password)==int(request.form['password'])):
                session['logged_in'] = True

                session['username']=user.name #store user in session
                session['password']=user.password #store user password in session

                return redirect(url_for('home.order'))
            elif user is None:
                error = 'Invalid Credentials. Please try again.'
        else:
            error = 'Invalid Credentials. Please try again.'
    return render_template('login.html', form=form, error=error, title="Hendrick Dining")

def store():
    if 'user' in session:
        user = session['user']
    if 'password' in session:
        password = session['password']


@users_blueprint.route('/logout')
@login_required
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('users.home'))
