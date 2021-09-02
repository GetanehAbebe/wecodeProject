import flask_httpauth
from flask import Flask, send_from_directory
from flask_cors import CORS,cross_origin
from Routes.recipe import recipes
from Routes.user import users
from Routes.category import categories
from Routes.diet import diets
from Routes.units import units
from Routes.ingredient import ingredients
from Routes.favorite import favorites
from flask_mongoengine import MongoEngine


auth = flask_httpauth.HTTPBasicAuth()
UPLOAD_FOLDER = 'public/uploads'
app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/recipe_python_server',
    'connect': 'true'
}
app.config['SECRET_KEY'] = 'finalprojectofwecode'
db = MongoEngine(app)
app.config['CORS_HEADERS'] = 'application/json'

app.register_blueprint(recipes)
app.register_blueprint(users)
app.register_blueprint(categories)
app.register_blueprint(diets)
app.register_blueprint(ingredients)
app.register_blueprint(units)
app.register_blueprint(favorites)


@app.route('/<name>')
def download_file(name):
    return send_from_directory(UPLOAD_FOLDER, name)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3200)
