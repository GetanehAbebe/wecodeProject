from flask import Flask, Blueprint
from controllers.diets import get_diets

diets = Blueprint('diets', __name__, url_prefix='/diets')


@diets.route('/', methods=['GET'])
def diets_name():
    return get_diets()
