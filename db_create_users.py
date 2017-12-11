from project import db
from project.models import User

# insert data
db.session.add(User("michael", "michael@illinois.edu", 19 ,"i'll-never-tell"))
db.session.add(User("admin", "ad@min.com",14 ,"admin"))

# commit the changes
db.session.commit()
