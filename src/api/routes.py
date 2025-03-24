"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Profile, Review, Notification
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required
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
@jwt_required()
def create_review():
    #obtengo datos del body
    data=request.json #del request(peticion) obtengo el json que me mandan del body
    user= db.session.query(User).filter_by(id=data['user_id']).one_or_none() #en la db se consulta(query)en la tabla user,filtramos por el id con el parametro 'user_id' que viene del body.nos obtiene uno o ninguno
    if user is None :
        return jsonify({'mensaje':f'no se encontro un usuario con el user_id {data['user_id']}'}),404
    tattooer= db.session.query(User).filter_by(id=data['tattooer_id']).one_or_none()
    if tattooer is None:
        return jsonify({"mensaje": f'no se encontro un usuario con el tattooer_id {data['tattooer_id']}'}),404
    
    #creo nueva instacia del review
    new_review=Review(
        description=data['description'],
        rating=data['rating'],
        user_id = data['user_id'],
        tattooer_id=data['tattooer_id']
    )
    #asignar los datos del body a la instacia recien creada
    #new_review.description=data['description']
    #new_review.rating=data['rating']
    #new_review.user_id= user.id
    #new_review.tattooer_id=tattooer.id
    #guardar la instancia modificada en la base de datos
    db.session.add(new_review)
    db.session.commit()
    #devuelvo un codigo 201 con el review creado
    return jsonify(new_review),201
    

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