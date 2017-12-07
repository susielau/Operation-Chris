# import the Flask class from the flask module
from flask import Flask, render_template,redirect,url_for,request,session,flash,g
from flask.ext.sqlalchemy import SQLAlchemy
from functools import wraps
import sqlite3
from flask.ext.bcrypt import Bcrypt

# create the application object
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
bcrypt = Bcrypt(app)

# create the sqlalchemy object
db = SQLAlchemy(app)


# login required decorator
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('You need to login first.')
            return redirect(url_for('login'))
    return wrap

# use decorators to link the function to a url
@app.route('/')
@login_required
def home():
    return render_template('index.html')  # return a template

@app.route('/welcome')
def welcome():
    return render_template('welcome.html')  # render a template

@app.route('/login',methods=['GET','POST'])
def login():
    error=None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            session['logged_in'] = True
            flash('You were just logged in')
            return redirect(url_for('home'))
    return render_template('login.html', error = error)

@app.route('/logout')
@login_required
def logout():
    session.pop('logged_in',None)
    flash('You were just logged out')
    return redirect(url_for('welcome'))

def connect_db():
    return sqlite3.connect(app.database)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    meals = db.Column(db.Integer, index=True)
    password = db.Column(db.String, nullable=False)
    
    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3
    
    def __init__(self,nickname,email,meals,password):
        self.nickname = nickname
        self.email = email
        self.meals = meals
        self.password = bcrypt.generate_password_hash(password)
    
    def __repr__(self):
        return '<User %r>' % (self.nickname)


# start the server with the 'run()' method
if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run(debug=True)
