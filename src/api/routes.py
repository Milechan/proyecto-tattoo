"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Profile, Review, Notification, UserType, Category
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from datetime import datetime
from flask_jwt_extended import jwt_required , get_jwt_identity
api = Blueprint('api', __name__) 

# Allow CORS requests to this API
CORS(api)


"""POSTS"""

#Ruta para obtener todos los post
@api.route('/posts', methods=['GET'])  
def get_all_posts():
    posts = db.session.query(Post).order_by(Post.created_at.desc()).all()
    result = [post.serialize() for post in posts]
    return jsonify(result), 200


#Ruta crear nuevo post
@api.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    current_user = get_jwt_identity()
    data = request.get_json()


    #Validar que la imagen, descripcion y id este presente antes de continuar
    if not data.get('image') or not data.get('description'):
        return jsonify({"msg": "Faltan campos requeridos"}), 400
    #Se crea la instancia con los datos de Post
    try:
        new_post = Post(
            image=data['image'],
            description=data['description'],
            likes=0,
            user_id=current_user,
            created_at=datetime.utcnow()
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.serialize()), 201
    #Manejo de errores
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#Ruta eliminar un post
@api.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    # Buscar el post en la bd
    post = Post.query.get(post_id)

    # Si no se encuentra el post muestra error 404
    if not post:
        return jsonify({"msg": "Post no encontrado"}), 404

    try:
        # Eliminar el post y confirmar
        db.session.delete(post)
        db.session.commit()
        return jsonify({"msg": "Post eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#Ruta editar post
@api.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.get_json()

    # Buscar el post por su ID
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"msg": "Post no encontrado"}), 404

    # Validar los campos antes de actualizar
    if not data.get('image') or not data.get('description'):
        return jsonify({"msg": "Faltan campos requeridos"}), 400

    try:
        post.image = data['image']
        post.description = data['description']
        db.session.commit()
        return jsonify(post.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#Ruta para ver un post por su id
@api.route('/posts/<int:post_id>', methods=['GET'])
def get_post_by_id(post_id):
    post = Post.query.get(post_id)
    
    if not post:
        return jsonify({"msg": "Post no encontrado"}), 404

    return jsonify(post.serialize()), 200


"""AUTENTICACIÓN"""
@api.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Validar datos 
    required_fields = ['username', 'password', 'email', 'is_tattooer']
    if not all(field in data for field in required_fields):
        return jsonify({"mensaje": "Faltan campos requeridos"}), 400
    
    # Verificar si el usuario ya existe
    if db.session.query(User).filter_by(email=data['email']).first():
        return jsonify({"mensaje": "El email ya está registrado"}), 400
    if db.session.query(User).filter_by(username=data['username']).first():
        return jsonify({"mensaje": "El nombre de usuario ya existe"}), 400
    is_tattooer = ""
    if data['is_tattooer'] == True:
        is_tattooer = "tattooer"
    else:
        is_tattooer= "user"

    user_type = db.session.query(UserType).filter_by(name=is_tattooer).first()
    # Crear nuevo usuario
    new_user = User(
        username=data['username'],
        password=data['password'],  # hashear esto
        email=data['email'],

        user_type_id=user_type.id,

        password=data['password'], #Falta hashear
        name=data.get('name'),
        last_name=data.get('last_name'),
        created_at=datetime.utcnow()
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"success": True, "mensaje": "Usuario registrado"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    
    # Validar datos requeridos
    if not data.get('email') or not data.get('password'):
        return jsonify({"mensaje": "Email y contraseña son requeridos"}), 400
    
    # Buscar usuario
    user = db.session.query(User).filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):  # Falta método check_password
        return jsonify({"mensaje": "Email o contraseña incorrectos"}), 401
    
    # Crear token de acceso
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        "success": True,
        "token": access_token,
        "user": user.serialize()  # Falta un método serialize
    }), 200


"""USUARIOS"""
@api.route('/user', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = db.session.query(User).get(current_user_id)
    
    if not user:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    return jsonify({"success": True, "user": user.serialize()}), 200


@api.route('/user', methods=['PUT'])
@jwt_required()
def update_user():
    current_user_id = get_jwt_identity()
    user = db.session.query(User).get(current_user_id)
    
    if not user:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    data = request.json
    
    # Actualizar campos permitidos
    if 'name' in data:
        user.name = data['name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'email' in data:
        # Verificar si el nuevo email ya está en uso
        if db.session.query(User).filter(User.email == data['email'], User.id != current_user_id).first():
            return jsonify({"mensaje": "El email ya está en uso"}), 400
        user.email = data['email']
    if 'password' in data:
        user.password = data['password']  # Debería hashear la nueva contraseña
    
    user.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({"success": True, "mensaje": "Usuario actualizado", "user": user.serialize()}), 200



@api.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user_id = get_jwt_identity()
    user = db.session.query(User).get(current_user_id)
    
    if not user:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"success": True, "mensaje": "Usuario eliminado"}), 200


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

#obtener las reviews de un tatuador
@api.route('/review/<int:tattoer_id>', methods=['GET']) 
def get_review_by_tattoer(tattooer_id):
#validar que exista un usuario con el tattooer_id que es el parametro que nos entregan
    tattooer= db.session.query(User).filter_by(id=tattooer_id).one_or_none() #consulta si existe un usuario o no y lo guarda en la variable tattooer
    if tattooer is None :
        return jsonify({'mensaje':f'no se encontro un usuario con el user_id {tattooer_id}'}),404
    reviews = db.session.query(Review).filter_by(tattooer_id=tattooer_id).all() 
    return jsonify(reviews),200

#para que un usuario cree una  review a un tatuador
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

#para obtener todas las notificaciones
@api.route('/notifications',methods=['GET'])
@jwt_required()
def get_all_notifications():
        current_user = get_jwt_identity()
        notifications = db.session.query(Notification).filter_by(user_id=current_user).all()
         # Si no hay notificaciones, devolver un mensaje vacío
        if not notifications:
            return jsonify({"mensaje": "No hay notificaciones disponibles",'notifications':[]}), 404
    # Convertir la lista de notificaciones en JSON
        notifications_json = [notification.serialize() for notification in notifications]
        return jsonify({"success": True, "notifications": notifications_json}), 200

#obtener una notificacion por id 
@api.route('/notification/<int:notification_id>',methods= ['GET'])
@jwt_required()
def get_notification_by_id(notification_id):
        current_user= get_jwt_identity()
        notification = db.session.query(Notification).filter_by(id=notification_id,user_id=current_user).one_or_none()
    # Si no se encuentra, devolver un error 404
        if notification is None:
            return jsonify({"mensaje": f"No se encontró la notificación con el ID {notification_id}"}), 404
    # Si se encuentra, devolver la notificación en formato JSON
        return jsonify(notification), 200

#para marcar como leida una notificacion
@api.route('/notifcation/<int:notification_id>/readed',methods=['PUT'])
@jwt_required()
def set_notification_readed(notification_id):
    current_id = get_jwt_identity()
    notification = db.session.query(Notification).filter_by(id=notification_id,user_id=current_id).one_or_none()
        # Si la notificación no existe, devolver un error 404
    if notification is None:
        return jsonify({"mensaje": f"No se encontró la notificación con el ID {notification_id}"}), 404
    # Marcar la notificación como leída (suponiendo que tiene un campo `readed`)
    notification.is_read = True
    db.session.commit()
    return jsonify({"success": True, "mensaje": "Notificación marcada como leída"}), 200

#para crear una notificacion, asignandola al usuario que se especifica en el body
@api.route('/notification',methods=['POST'])
@jwt_required()
def create_notification():
    current_user= get_jwt_identity()
    # Obtener datos del cuerpo de la petición
    data = request.json
    # Validar que los datos requeridos estén presentes
    if "mensaje" not in data or "user_id" not in data:
        return jsonify({"mensaje": "Faltan datos requeridos (mensaje, user_id)"}), 400
    # Crear una nueva instancia de Notificación
    new_notification = Notification(
        menssage=data["mensaje"],
        user_id=data["user_id"],
        is_read=False, # Inicialmente la notificación no está leída
        date =datetime.utcnow(),
        sender_id =current_user
    )
    # Guardar en la base de datos
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({"success": True, "mensaje": "Notificación creada con éxito", "notification": new_notification.serialize()}), 201



"""HOME"""

# Categorías: obtiene todos los perfiles de una categoría determinada.
@api.route('/profiles/category/<string:category>', methods=['GET'])
def get_profiles_by_category(category):

    categories = db.session.query(Category).filter_by(name= category).one_or_none()
    if not categories:
        return jsonify({"mensaje": f"No se encontró categoria para ese nombre'{category}'"}), 404
    profiles = db.session.query(Profile).filter_by(category_id=categories.id).all()
    if not profiles:
        return jsonify({"mensaje": f"No se encontraron perfiles para la categoría '{category}'"}), 404
    result = [profile.serialize() for profile in profiles]
    return jsonify(result), 200


# Top Likes: obtiene los posts con más likes.
@api.route('/posts/top-likes', methods=['GET'])
def get_top_likes_posts():
    # Se obtienen los posts ordenados por likes en forma descendente
    posts = db.session.query(Post).order_by(Post.likes.desc()).limit(10).all()
    result = [post.serialize() for post in posts]
    return jsonify(result), 200


# Top Tatuadores: obtiene los perfiles con mejores evaluaciones.
@api.route('/profiles/top-tattooer', methods=['GET'])
def get_top_tattooer():
    # Se obtienen los perfiles ordenados por ranking en forma descendente, limitando a 10 resultados
    profiles = db.session.query(Profile).order_by(Profile.ranking.desc()).limit(10).all()
    result = [profile.serialize() for profile in profiles]
    return jsonify(result), 200


"""BUSCADOR"""