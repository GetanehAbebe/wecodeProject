import mongoengine
import datetime
from mongoengine import *
class Category(Document):
    id = SequenceField(primary_key=True)
    name = StringField(required=True, min_length=3,unique=True)
    meta = {
        'db-alias': 'core',
        "collection": "categories"
    }
