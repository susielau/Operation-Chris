import os
# default config
class BaseConfig(object):
    DEBUG = False
    SECRET_KEY = b'\xd6\xb3\x18\xed\x84\x8b\xfc\t\xaamW\xe0\x9c\x07\xfd\xc7\xbf\x1cW\x9dm\xaa>\x8b'
    SQLALCHEMY_DATABASE_URI = "postgresql://localhost/operation_chris"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    print(SQLALCHEMY_DATABASE_URI)

class DevelopmentConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(BaseConfig):
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
