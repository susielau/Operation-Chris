import os
basedir = os.path.abspath(os.path.dirname(__file__))

CSRF_ENABLED = True
SECRET_KEY = b'{\x9dz\xf2\xd2\xedp\xbaKgT<\xaan\x81%D\xbc\xfbi\x01\xcc\x9a\x92'
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')

