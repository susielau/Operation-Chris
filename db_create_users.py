from project import db
from project.models import User

# insert data
db.session.add(User("michael", "michael@illinois.edu", 19 ,'123456'))
db.session.add(User("admin", "ad@min.com",14 ,'123456'))

# commit the changes
db.session.commit()
