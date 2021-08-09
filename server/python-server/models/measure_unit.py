from mongoengine import *
class Unit(Document):
    id = SequenceField(primary_key=True)
    name = StringField(required=True, min_length=3,unique=True)
    unit_in_gram = FloatField()
    meta = {
        'db-alias': 'core',
        "collection": "measure_units"
    }
