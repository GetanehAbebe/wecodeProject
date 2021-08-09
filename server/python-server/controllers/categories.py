from models.category import Category
from flask import jsonify
def get_category():
    response = Category.objects()
    return jsonify(response)