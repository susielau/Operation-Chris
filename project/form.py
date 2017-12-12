from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired()])
    password = StringField('Password', validators=[DataRequired()])

class OrderForm(FlaskForm):
    item = StringField('Item Name')
    patty = SelectField('Patty', choices=[('1','1'),('2','2'),('3','3')])
    no_bun = BooleanField('No Bun')
    cheese = BooleanField('Cheese')
    bacon = BooleanField('Bacon')
