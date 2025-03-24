"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Profile, Review, Notification
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from datetime import datetime
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

#Ruta para obtener todos los post
@api.route('/posts', methods=['GET'])  
def get_all_posts():
    posts = db.session.query(Post).order_by(Post.created_at.desc()).all()
    result = [post.serialize() for post in posts]
    return jsonify(result), 200


#Ruta crear nuevo post
@api.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()

    #Validar que la imagen, descripcion y id este presente antes de continuar
    if not data.get('image') or not data.get('description') or not data.get('user_id'):
        return jsonify({"msg": "Faltan campos requeridos"}), 400
    #Se crea la instancia con los datos de Post
    try:
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
    #Manejo de errores
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



"""USUARIO"""


"""PERFIL"""
#Ruta para ver perfil por ID:
@api.route('/profile/<int:tattooer_id>', methods=['GET'])
def get_tattooer_profile(tattooer_id):
    # Buscar al usuario en la base de datos
    tattooer = db.session.query(User).filter_by(id=tattooer_id).one_or_none()

    # Validar si el tatuador existe
    if tattooer is None:
        return jsonify({'mensaje': f'No se encontró un tatuador con el ID {tattooer_id}'}), 404

    # Obtener el perfil asociado
    if tattooer.profile is None:
        return jsonify({'mensaje': f'El usuario con ID {tattooer_id} no tiene un perfil registrado'}), 404

    # Convertir `social_media` de string a JSON si es necesario
    social_media = json.loads(tattooer.profile.social_media) if tattooer.profile.social_media else {}

    # Estructurar la respuesta con la información relevante del tatuador y su perfil
    tattooer_data = {
        'id': tattooer.id,
        'name': tattooer.name,
        'username': tattooer.username,
        'email': tattooer.email,
        'bio': tattooer.profile.bio,
        'social_media': social_media,  
        'profile_picture': tattooer.profile.profile_picture,
        'ranking': tattooer.profile.ranking,
        'created_at': tattooer.created_at
    }

    return jsonify(tattooer_data), 200


#Ruta para crear perfil:
@api.route('/profile', methods=['POST'])
def create_tattooer_profile():
    data = request.get_json()

    required_fields = ['name', 'email', 'username', 'password', 'bio', 'social_media']
    for field in required_fields:
        if field not in data:
            return jsonify({'mensaje': f'Falta el campo requerido: {field}'}), 400

    # Verificar si el email o username ya está registrado
    existing_user = db.session.query(User).filter(
        (User.email == data['email']) | (User.username == data['username'])
    ).first()
    if existing_user:
        return jsonify({'mensaje': 'El email o el username ya están registrados'}), 400

    # Validar que `social_media` sea un objeto JSON válido
    if not isinstance(data['social_media'], dict):
        return jsonify({'mensaje': 'El campo social_media debe ser un objeto JSON válido'}), 400

    # Crear nuevo usuario
    new_user = User(
        name=data['name'],
        username=data['username'],
        email=data['email'],
        password=data['password'],
        user_type='tattooer'
    )

    db.session.add(new_user)
    db.session.commit()

    # Crear perfil asociado
    new_profile = Profile(
        user_id=new_user.id,
        bio=data['bio'],
        social_media=json.dumps(data['social_media']),  # Convertir JSON a string para almacenar
        profile_picture=data.get('profile_picture', ''),  # Opcional, si no lo envían se guarda vacío
        ranking=0  # Iniciar ranking en 0 por defecto
    )

    db.session.add(new_profile)
    db.session.commit()

    return jsonify({
        'mensaje': 'Perfil creado exitosamente',
        'user': new_user.serialize()
    }), 201


#Ruta para actualizar perfil por ID:
@api.route('/profile/<int:tattooer_id>', methods=['PUT'])
def update_tattooer_profile(tattooer_id):
    data = request.get_json()

    # Buscar al usuario en la base de datos
    tattooer = db.session.query(User).filter_by(id=tattooer_id).one_or_none()
    if tattooer is None:
        return jsonify({'mensaje': f'No se encontró un tatuador con el ID {tattooer_id}'}), 404

    # Verificar si el usuario tiene un perfil
    if tattooer.profile is None:
        return jsonify({'mensaje': f'El usuario con ID {tattooer_id} no tiene un perfil registrado'}), 404

    # Obtener el perfil asociado
    profile = tattooer.profile

    # Actualizar los campos si están en la solicitud
    if 'bio' in data:
        profile.bio = data['bio']
    if 'social_media' in data:
        if not isinstance(data['social_media'], dict):
            return jsonify({'mensaje': 'El campo social_media debe ser un objeto JSON válido'}), 400
        profile.social_media = json.dumps(data['social_media'])  # Guardamos como JSON en la DB
    if 'profile_picture' in data:
        profile.profile_picture = data['profile_picture']
    if 'ranking' in data:
        profile.ranking = data['ranking']

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({
        'mensaje': 'Perfil actualizado exitosamente',
        'profile': profile.serialize()
    }), 200

#Ruta para eliminar el perfil por ID:
@api.route('/profile/<int:tattooer_id>', methods=['DELETE'])
def delete_tattooer_profile(tattooer_id):
    # Buscar al usuario en la base de datos
    tattooer = db.session.query(User).filter_by(id=tattooer_id).one_or_none()
    if tattooer is None:
        return jsonify({'mensaje': f'No se encontró un tatuador con el ID {tattooer_id}'}), 404

    # Verificar si el usuario tiene un perfil
    if tattooer.profile is None:
        return jsonify({'mensaje': f'El usuario con ID {tattooer_id} no tiene un perfil registrado'}), 404

    # Obtener el perfil asociado
    profile = tattooer.profile

    # Eliminar el perfil de la base de datos
    db.session.delete(profile)
    db.session.commit()

    return jsonify({'mensaje': f'Perfil del usuario con ID {tattooer_id} eliminado exitosamente'}), 200


"""REVIEWS"""
@api.route('/review/<int:tattoer_id>', methods=['GET']) 
def get_review_by_tattoer(tattooer_id):
#validar que exista un usuario con el tattooer_id que es el parametro que nos entregan
    tattooer= db.session.query(User).filter_by(id=tattooer_id).one_or_none() #consulta si existe un usuario o no y lo guarda en la variable tattooer
    if tattooer is None :
        return jsonify({'mensaje':f'no se encontro un usuario con el user_id {tattooer_id}'}),404
    reviews = db.session.query(Review).filter_by(tattooer_id=tattooer_id).all() 
    return jsonify(reviews),200


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