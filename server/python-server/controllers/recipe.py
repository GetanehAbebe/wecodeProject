import json
from flask import Flask, flash, request, redirect, url_for, send_from_directory
from flask_cors import CORS
from flask_cors import cross_origin
from flask_mongoengine import MongoEngine
from flask import jsonify
from werkzeug.utils import secure_filename
from models.user import User
from models.ingredient import Ingredient
from models.category import Category
from models.measure_unit import Unit
from models.recipe import Recipe
from models.diet import Diet
import time
import os

UPLOAD_FOLDER = 'public/uploads'
def upload_image(file):
    filename = str(round(time.time() * 1000)) + secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    return filename


def upload_recipe():
    body = json.loads(request.form.get('recipe'))
    image = request.files['image']
    print('image', image.filename)
    filename = secure_filename(image.filename)
    for ingredient in body["instructions"]:
        if Ingredient.objects(name=ingredient["ingredient"]):
            print('exists')
        else:
            Ingredient(name=ingredient["ingredient"]).save()
    categories = []
    diets = []
    for i in body["category"]:
        print(Category.objects(id=i).get())
        categories.append({"name": Category.objects(id=i).get().name, "id": i})

    for j in body["diet"]:
        print(Diet.objects(id=j).get())
        diets.append({"name": Diet.objects(id=j).get().name, "id": j})
    # print(diets)

    fields = {
        "name": body['name'],
        "source": body['source'],
        "sourceUrl": body['sourceUrl'],
        "description": body['description'],
        "prepTimeMin": body['prepTimeMin'],
        "instructions": body['guide'],
        "ingredients": body['instructions'],
        "user": body['userId'],
        "diets": diets,
        "categories": categories
    }
    insert_recipe = Recipe(**fields).save()
    insert_recipe.update(images=upload_image(image))
    return 'uploaded'


def upgrade_recipe():
    body = json.loads(request.form.get('recipe'))
    image = request.files['image']
    categories = []
    diets = []
    for i in body["category"]:
        # print(Category.objects(id=i).get())
        categories.append({"name": Category.objects(id=i).get().name, "id": i})

    for j in body["diet"]:
        diets.append({"name": Diet.objects(id=j).get().name, "id": j})
    for ingredient in body["instructions"]:
        if Ingredient.objects(name=ingredient["ingredient"]):
            print('exists')
        else:
            Ingredient(name=ingredient["ingredient"]).save()
    fields = {
        "name": body['name'],
        "source": body['source'],
        "sourceUrl": body['sourceUrl'],
        "description": body['description'],
        "prepTimeMin": body['prepTimeMin'],
        "instructions": body['guide'],
        "ingredients": body['instructions'],
        "user": body['userId'],
        "diets": diets,
        "categories": categories,
    }

    single_recipe = Recipe.objects(id=body["id"]).get()
    print('single', single_recipe.name)
    update_recipe = single_recipe.update(**fields)
    if image:
        single_recipe.update(images=upload_image(image))
    return jsonify(update_recipe)

def get_all_recipes():
    response = Recipe.objects()
    return jsonify(response)