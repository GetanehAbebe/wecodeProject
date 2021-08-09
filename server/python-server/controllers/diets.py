from models.diet import Diet
import json
from flask import jsonify

def get_diets():
    response = Diet.objects()
    return jsonify(response)
