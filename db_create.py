from project import db
from project.models import User

#create the database and the db tables
db.create_all()

#insert
db.session.add(User("Jenny","xc14@illinois.edu",14, '123456'))
#commit the changes
db.session.commit()
