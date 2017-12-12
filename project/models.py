from project import db, bcrypt

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Food(db.Model):

    __tablename__="foods"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String,nullable=False)
    addons = db.Column(db.String,nullable=True)
    recipient_id = db.Column(db.Integer,ForeignKey('users.id'))

    def __init__(self,name,addons):
        self.name=name
        self.addons=addons

    def __repr__(self):
        return '<name {}>'.format(self.name)


class User(db.Model):

    __tablename__="users"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String,nullable=False)
    email = db.Column(db.String,nullable=False)
    meals = db.Column(db.Integer,nullable=False)
    password = db.Column(db.Binary,nullable=False)
    food = relationship("Food", backref="recipient")

    def __init__(self,name,email,meals,password):
        self.name=name
        self.email=email
        self.meals=meals
        self.password=bcrypt.generate_password_hash(password).decode('utf-8')

    def __repr__(self):
        return '<{}-{}>'.format(self.name,self.email)