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

"""POSTS"""

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



"""USUARIO"""


"""PERFIL"""


"""REVIEWS"""
@api.route('/review/<int:tattoer_id>', methods=['GET']) 
def get_review_by_tattoer(tattooer_id):
    pass



@api.route('/review',methods=['POST'])
def create_review():
    pass

"""NOTIFICACIONES"""
@api.route('/notifications',methods=['GET'])
def get_all_notifications():
    pass

@api.route('/notification/<int:notification_id>',methods= ['GET'])
def get_notification_by_id(notification_id):
    pass

@api.route('/notifcation/<int:notification_id>/readed',methods=['PUT'])
def set_notification_readed(notification_id):
    pass
@api.route('/notification',methods=['POST'])
def create_notification():
    pass



"""HOME"""


"""BUSCADOR"""