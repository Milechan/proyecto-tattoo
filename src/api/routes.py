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




"""AUTENTICACIÓN"""
@api.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Validar datos 
    required_fields = ['username', 'password', 'email', 'user_type_id']
    if not all(field in data for field in required_fields):
        return jsonify({"mensaje": "Faltan campos requeridos"}), 400
    
    # Verificar si el usuario ya existe
    if db.session.query(User).filter_by(email=data['email']).first():
        return jsonify({"mensaje": "El email ya está registrado"}), 400
    if db.session.query(User).filter_by(username=data['username']).first():
        return jsonify({"mensaje": "El nombre de usuario ya existe"}), 400
    
    # Crear nuevo usuario
    new_user = User(
        username=data['username'],
        password=data['password'],  # hashear esto
        email=data['email'],
        user_type_id=data['user_type_id'],
        created_at=datetime.utcnow()
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"success": True, "mensaje": "Usuario registrado"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    
    if not data.get('username') or not data.get('password'):
        return jsonify({"mensaje": "Usuario y contraseña requeridos"}), 400
    
    user = db.session.query(User).filter_by(username=data['username']).first()
    
    # Comparación directa de password (sin check_password)
    if not user or user.password != data['password']:
        return jsonify({"mensaje": "Credenciales inválidas"}), 401
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        "success": True,
        "token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "user_type_id": user.user_type_id
        }
    }), 200


"""USUARIOS"""
@api.route('/user', methods=['GET'])
@jwt_required()
def get_current_user():
    user = db.session.query(User).get(get_jwt_identity())
    
    if not user:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "user_type_id": user.user_type_id,
            "created_at": user.created_at.isoformat() if user.created_at else None
        }
    }), 200


@api.route('/user', methods=['PUT'])
@jwt_required()
def update_user():
    user = db.session.query(User).get(get_jwt_identity())
    
    if not user:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    data = request.json
    
    if 'username' in data:
        if db.session.query(User).filter(User.username == data['username'], User.id != user.id).first():
            return jsonify({"mensaje": "Nombre de usuario ya existe"}), 400
        user.username = data['username']
    
    if 'email' in data:
        if db.session.query(User).filter(User.email == data['email'], User.id != user.id).first():
            return jsonify({"mensaje": "Email ya registrado"}), 400
        user.email = data['email']
    
    if 'password' in data:
        user.password = data['password']  # hashear
    
    db.session.commit()
    
    return jsonify({"success": True, "mensaje": "Usuario actualizado"}), 200


@api.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user = db.session.query(User).get(get_jwt_identity())
    
    if not user:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"success": True, "mensaje": "Usuario eliminado"}), 200

"""PERFIL"""


"""REVIEWS"""


"""NOTIFICACIONES"""


"""HOME"""


"""BUSCADOR"""