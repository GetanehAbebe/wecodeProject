import datetime

from flask import Flask
from flask_mongoengine import MongoEngine
from mongoengine import *
from models.category import Category

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/recipe_python_server',
    'connect': 'true'
}
db = MongoEngine(app)


class User(db.Document):
    # id = db.IntFeild(default=1, autoIncrement=True)
    id = SequenceField(primary_key=True)
    firstName = db.StringField(required=True, min_length=3, max_length=30)
    lastName = db.StringField(min_length=3, required=True, max_length=30)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)
    favoriteCategory = db.ReferenceField(Category, required=False)
    registerDate = db.DateField(default=datetime.datetime.now())
    meta = {
        'db-alias': 'core',
        "collection": "users"
    }
