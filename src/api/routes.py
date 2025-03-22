"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Profile, Review, Notification
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__) 

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/posts', methods=['GET'])  #Ruta para obtener todos los post
def get_all_posts():
    posts = db.session.query(Post).order_by(Post.created_at.desc()).all()
    result = [post.serialize() for post in posts]
    return jsonify(result), 200

@api.route('/posts', methods=['POST']) #Crear nuevo post
def create_post():
    data = request.json
    new_post = Post(
        image=data['image'],
        description=data['description'],
        likes=0,
        user_id=data['user_id'],
        created_at=datetime.utcnow()
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify(new_post.serialize()), 201


