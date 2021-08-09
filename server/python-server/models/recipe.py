import datetime
from mongoengine import *
from models.user import User
from models.diet import Diet
from models.category import Category
from models.ingredient import Ingredient
from models.measure_unit import Unit

class Recipe(Document):
    id = SequenceField(primary_key=True)
    name = StringField(required=True, min_length=3, unique=True)
    user = StringField(required=True)
    description = StringField(required=True, min_length=3, max_length=100)
    views = IntField(default=0)
    source = StringField(min_length=3, max_length=100)
    sourceUrl = URLField()
    prepTimeMin = IntField(required=True,min_value=1)
    images = FileField()
    instructions = ListField()
    diets = ListField()
    categories = ListField()
    ingredients = ListField()
    upload_date = DateField(default=datetime.datetime.now())
    is_private = BooleanField(default=False)
    images = StringField()
    meta = {
        'db-alias': 'core',
        "collection": "recipes"
    }
