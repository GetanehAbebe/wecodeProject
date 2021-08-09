from flask import Flask, flash, request, redirect, url_for,send_from_directory,jsonify

from models.recipe import Recipe
from models.user import User
import json

def user_login():
    try:
        info = request.get_json()
        print(info)
        email = info["email"]
        password = info["password"]
        if User.objects(email=email):
            user = User.objects(email=email).get()
            if user.password == password:
                return jsonify(user), 200
            else:
                return {
                           "message": "Wrong email/password combination!"
                       }, 200
        else:
            return {"message": "User doesn't exist"}, 200
    except Exception as e:
        err = {
            "message": str(e)
        }
        return json.dumps(err), 200



def update_user():
    body = request.get_json()
    print(body)
    id = body["id"]
    fields = {
        "firstName": body['firstName'],
        "lastName": body['lastName'],
        "email": body['email'],
        "password": body['password']
    }
    user = User.objects(id=id)
    update_user = user.update(**fields)
    return jsonify(update_user)

def add_user():
    body = request.get_json()
    print(body)
    details = {
        "firstName": body['firstName'],
        "lastName": body['lastName'],
        "email": body['email'],
        "password": body['password']
    }
    user = User(**details).save()
    return jsonify(user)

def user_recipes():
    body = request.get_json()
    recipes = Recipe.objects(user=body["id"])
    print(recipes)
    return jsonify(recipes)

def get_specific_user():
    req = request.get_json()
    user = User.objects(id=req["id"]).get()
    print(user)
    return jsonify(user)