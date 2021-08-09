from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from controllers.recipe import upload_recipe, upgrade_recipe, get_all_recipes
from controllers.diets import get_diets
from controllers.categories import get_category
from controllers.user import user_login, update_user, add_user, user_recipes, get_specific_user
from controllers.util import increment_views, recipe_gallery, \
    specific_recipe, most_popular_recipes, get_ingredients, \
    get_units
UPLOAD_FOLDER = 'public/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/recipe_python_server',
    'connect': 'true'
}
CORS(app)
db = MongoEngine(app)
# ========================RECIPE-ROUTES===============================
@app.route('/recipes', methods=['GET'])
def get_recipes():
    return get_all_recipes()

@app.route('/recipes/')
def gallery():
    return recipe_gallery()

@app.route('/recipes/upload', methods=['POST'])
def insert_recipe():
    return upload_recipe()

@app.route('/recipes/update', methods=['POST'])
def update_recipe():
    return upgrade_recipe()

@app.route('/recipes/getRecipe', methods=['POST'])
def get_specific_recipe():
    return specific_recipe()

@app.route('/recipes/increment', methods=['POST'])
def increment():
    return increment_views()

@app.route('/recipes/popular')
def most_popular():
    return most_popular_recipes()

@app.route('/recipes/myrecipes', methods=['POST'])
def recipes_of_user():
    return user_recipes()

# ========================USER-ROUTES===============================
@app.route('/users', methods=['POST'])
def register():
    return add_user()

@app.route('/users', methods=['PUT'])
def update_user_details():
    return update_user()

@app.route('/users/getUser', methods=['POST'])
def get_user():
    return get_specific_user()

@app.route('/users/login', methods=['POST'])
def login():
    return user_login()

# ========================REST-ROUTES===============================
@app.route('/categories', methods=['GET'])
def categories():
    return get_category()

@app.route('/ingredients', methods=['GET'])
def get_all_ingredients():
    return get_ingredients()

@app.route('/units', methods=['GET'])
def get_all_units():
    return get_units()

@app.route('/diets', methods=['GET'])
def diets_name():
    return get_diets()

@app.route('/<name>')
def download_file(name):
    return send_from_directory(UPLOAD_FOLDER, name)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3200, debug=True)
    app.logger.info("Server shutting down")
