from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired()])
    password = IntegerField('Password', validators=[DataRequired()])

class OrderForm(FlaskForm):
    patty = SelectField('Patty')
