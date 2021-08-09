from mongoengine import *
class Diet(DynamicDocument):
    id = SequenceField(primary_key=True)
    name = StringField(required=True, min_length=3,unique=True)
    meta = {
        'db-alias': 'core',
        "collection": "diets"
    }
