from project import db

#create the database and the db tables
db.create_all()

#insert
db.session.add(User("Susie","susie@illinois.edu",14,"hello"))
db.session.add(User("Mandy","mandy@illinois.edu",14,"hello"))
db.session.add(User("Daniel","daniel@illinois.edu",14,"hello"))
db.session.add(User("Jenny","jenny@illinois.edu",14,"hello"))

#commit the changes
db.session.commit()