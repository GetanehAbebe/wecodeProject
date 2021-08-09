from flask import Flask, flash, request, redirect, url_for,send_from_directory,jsonify

from models.ingredient import Ingredient
from models.measure_unit import Unit
from models.recipe import Recipe
def increment_views():
    body = request.get_json()
    print(body)
    id = body["id"]
    recipe = Recipe.objects(id=id).get()
    views = {"views": recipe["views"] + 1}
    print(recipe, recipe["views"])
    update_view = recipe.update(**views)
    return jsonify(update_view)

def recipe_gallery():
    order = '-'
    size = request.args.get("size")
    limit = request.args.get("limit")
    offset = (int(limit)) * int(size)
    order_by = request.args.get("orderBy")
    if request.args.get("order") == 'asc':
        order = '+'
    response = jsonify(Recipe.objects().skip(offset).limit(int(size)).order_by(order + order_by))
    return response

def specific_recipe():
    body = request.get_json()
    # print(body)
    id = body["id"]
    recipe = Recipe.objects(id=id).get()
    return jsonify(recipe)

def most_popular_recipes():
    return jsonify(Recipe.objects().limit(6).order_by('-' + 'views'))


def get_ingredients():
    response = Ingredient.objects()
    return jsonify(response)

def get_units():
    response = Unit.objects()
    return jsonify(response)

