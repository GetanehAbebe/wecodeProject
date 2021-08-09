from mongoengine import *
class Ingredient(DynamicDocument):
    id = SequenceField(primary_key=True)
    name = StringField(required=True, min_length=3,unique=True)
    price_per_gram = FloatField(min_value=0, default=1)
    meta = {
        'db-alias': 'core',
        "collection": "ingredients"
    }
