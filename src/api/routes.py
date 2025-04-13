"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Profile, Review, Notification
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, User, Post, Profile, Review, Notification, UserType, Category
import sendgrid
from sendgrid.helpers.mail import Mail
import os
import re
import base64
from api.utils import s3
from datetime import datetime
import json
from flask_jwt_extended import jwt_required , get_jwt_identity, create_access_token
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

    user = db.session.query(User).filter_by(id=current_user).one_or_none()
    if user is None:
        return jsonify({"msg": "Usuario no válido o no encontrado"}), 404

    if not data.get('image') or not data.get('description'):
        return jsonify({"msg": "Faltan campos requeridos"}), 400

    try:
        new_post = Post(
            image=data['image'],
            description=data['description'],
            user_id=current_user,
            created_at=datetime.now()
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.serialize()), 201

    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({"error": str(e)}), 500


#Ruta eliminar un post
@api.route('/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    # Buscar el post en la bd
    post = db.session.query(Post).filter_by(id=post_id).one_or_none()

    if post is None:
        return jsonify({"msg": "Post no encontrado"}), 404

    current_user_id = int(get_jwt_identity())


    if post.user_id != current_user_id:
        return jsonify({"msg": "No tienes permiso para eliminar este post"}), 403
   
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
@jwt_required()
def update_post(post_id):
    data = request.get_json()

    #Buscar el post por su ID
    post = db.session.query(Post).filter_by(id=post_id).one_or_none()
    if post is None:
        return jsonify({"msg": "Post no encontrado"}), 404

    current_user_id = int(get_jwt_identity())
    if post.user_id != current_user_id:
        return jsonify({"msg": "No tienes permiso para editar este post"}), 403

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
    post = db.session.query(Post).filter_by(id=post_id).one_or_none()
    
    if post is None:
        return jsonify({"msg": "Post no encontrado"}), 404

    return jsonify(post.serialize()), 200


"""AUTENTICACIÓN"""


@api.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Validar datos requeridos
    if not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400
    
    # Verificar si el usuario ya existe
    if db.session.query(User).filter_by(email=data['email']).first():
        return jsonify({"msg": "El usuario ya existe"}), 400
    
    if data.get("isTattooer") is True:
        user_type = db.session.query(UserType).filter_by(name='tattooer').first()
    else:
        user_type = db.session.query(UserType).filter_by(name='user').first()
    if data.get("categoryName") is not None: 
        category = db.session.query(Category).filter_by(name=data.get('categoryName')).first()
    else:
        category = None

    # Crear nuevo usuario
    new_user = User(
        email=data['email'],
        name=data.get('name'),
        username=data.get('username'),
        user_type_id=user_type.id,
        category_id=category.id if category is not None else None,
        created_at=datetime.utcnow()
    )

    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"success": True, "msg": "Usuario registrado con éxito"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    
    # Validar datos requeridos
    if not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400
    
    # Buscar usuario
    user = db.session.query(User).filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401
    
    # Crear token de acceso
    access_token = create_access_token(identity=str(user.id), expires_delta= False)
    
    return jsonify({
        "success": True,
        "token": access_token,
        "user": user.serialize()
    }), 200


"""USUARIOS"""
@api.route('/user', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = db.session.query(User).filter_by(id= current_user_id).one_or_none()
    
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    print(user.serialize())
    return jsonify({"success": True, "user": user.serialize()}), 200


@api.route('/user', methods=['PUT'])
@jwt_required()
def update_user():
    current_user_id = get_jwt_identity()
    user = db.session.query(User).filter_by(id=current_user_id).one_or_none()
    
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    data = request.json
    
    # Actualizar campos permitidos
    if 'name' in data:
        user.name = data['name']
    if 'email' in data:
        # Verificar si el nuevo email ya está en uso
        if db.session.query(User).filter(User.email == data['email'], User.id != current_user_id).first():
            return jsonify({"msg": "El email ya está en uso"}), 400
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])

    db.session.commit()
    
    return jsonify({"success": True, "msg": "Usuario actualizado", "user": user.serialize()}), 200



@api.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user_id = get_jwt_identity()
    user = db.session.query(User).get(current_user_id)
    
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"success": True, "msg": "Usuario eliminado"}), 200

"""PERFIL"""
@api.route('/profile/<int:tattooer_id>', methods=['GET'])
def get_tattooer_profile(tattooer_id):
    # Buscar al usuario en la base de datos
    tattooer = db.session.query(User).filter_by(id=tattooer_id).one_or_none()

    if tattooer is None:
        return jsonify({'msg': f'No se encontró un usuario con el ID {tattooer_id}'}), 404

    # Verificar que el usuario sea un tatuador
    if tattooer.user_type is None or tattooer.user_type.name.lower() != 'tattooer':
        return jsonify({'msg': f'El usuario con ID {tattooer_id} no es un tatuador'}), 400

    # Verificar si el usuario tiene un perfil asociado
    if tattooer.profile is None:
        return jsonify({'msg': f'El usuario con ID {tattooer_id} no tiene un perfil registrado'}), 404

    return jsonify(tattooer.profile.serialize()), 200


#Ruta para crear perfil:
@api.route('/profile', methods=['POST'])
@jwt_required()
def create_tattooer_profile():
    data = request.get_json()

    user_id = get_jwt_identity()
    user = db.session.query(User).filter_by(id=user_id).one_or_none()
    if user is None :
        return jsonify({"msg":"no se encuentra el usuario con ese id"}),404
    if "category_name" not in data:
        return jsonify({"msg":"el campo category_name es obligatorio"}),400
    category= db.session.query(Category).filter_by(name=data["category_name"]).one_or_none()
    if category is None:
        return jsonify({"msg":"no se encuentra la categoria con ese nombre"}),404
    user_type= db.session.query(UserType).filter_by(id = user.user_type_id).one_or_none()
    if user_type.name == "user":
        return jsonify({"msg":"Solo puede crear perfil un tatuador"}),402
    

    # Crear perfil asociado
    new_profile = Profile(
        user_id=user_id,
        bio="",
        social_media_insta="", 
        social_media_wsp="",
        social_media_x="",
        social_media_facebook="",
        profile_picture="",  
        ranking=0, 
        category_id=category.id
    )

    db.session.add(new_profile)
    db.session.commit()

    ## CREAMOS CARPETA PARA PERFIL CON USERNAME DEL USUARIO
    # try:
    #     bucket = s3.Bucket("matchtattoo")
    #     bucket.Object(user.username).put() 
    # except Exception as e:
    #     print(e)

    return jsonify({
        'msg': 'Perfil creado exitosamente',
        'user': new_profile.serialize()
    }), 201
@api.route('/s3', methods=['GET'])
def test_s3():
    for bucket in s3.buckets.all():
        print(bucket)
    return jsonify({"msg": "tested ok." })

#Ruta para actualizar perfil por ID:
@api.route('/profile/<int:tattooer_id>', methods=['PUT'])
@jwt_required()
def update_tattooer_profile(tattooer_id):
    data = request.get_json()
    current_user = get_jwt_identity()
    # Buscar al usuario en la base de datos
    tattooer = db.session.query(User).filter_by(id=tattooer_id).one_or_none()
    if tattooer is None:
        return jsonify({'msg': f'No se encontró un tatuador con el ID {tattooer_id}'}), 404

    # Verificar si el usuario tiene un perfil
    if tattooer.profile is None:
        return jsonify({'msg': f'El usuario con ID {tattooer_id} no tiene un perfil registrado'}), 404

    # Obtener el perfil asociado
    profile = tattooer.profile

    # verificar si current_user es el propietario del perfil antes de editar
    user = db.session.query(User).filter_by(id=current_user).one_or_none()
    if user is None:
        return jsonify({'msg': f'El usuario con ID {current_user} no tiene permisos para editar este perfil'}), 403

    # Actualizar los campos si están en la solicitud
    if 'bio' in data:
        profile.bio = data['bio']
    if 'social_media_insta' in data:
        profile.social_media_insta=data['social_media_insta']
    if 'social_media_wsp' in data:
        profile.social_media_wsp=data['social_media_wsp']
    if 'social_media_x' in data:
        profile.social_media_x=data['social_media_x']
    if 'social_media_facebook' in data:
        profile.social_media_facebook=data['social_media_facebook']
    if 'profile_picture' in data and data['profile_picture'] != "": # si detecta que le enviamos la foto
        try:
            b64_image = data["profile_picture"]
            # validamos formato
            match = re.match(r"data:(image/\w+);base64,(.+)",b64_image) 
            if not match:
                return jsonify({"msg":"error, profile_picture tiene un formato invalido"}),400
            # obtenemos informacion
            mime_type = match.group(1) # tipo de archivo
            image_data = match.group(2) # imagen en base64
            extension = mime_type.split('/')[-1] # extension de archivo

            filename = f"profiles/{user.username}/profile_picture.{extension}" # definimos nombre del archivo
            image_bytes = base64.b64decode(image_data) # decodificamos imagen

            # subimos imagen
            bucket = s3.Bucket("matchtattoo")
            bucket.put_object(
                Key=filename,
                Body=image_bytes,
                ContentType=mime_type
            )
            # guardamos en perfil la url
            profile.profile_picture = f"https://matchtattoo.s3.us-east-2.amazonaws.com/profiles/{user.username}/profile_picture.{extension}"
            


        except Exception as e:
            print(e)
            return jsonify({"msg":"error subiendo la foto de perfil"}),500

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({
        'msg': 'Perfil actualizado exitosamente',
        'profile': profile.serialize()
    }), 200

#Ruta para eliminar el perfil por ID:
@api.route('/profile/<int:tattooer_id>', methods=['DELETE'])
@jwt_required()
def delete_tattooer_profile(tattooer_id):
    current_user = get_jwt_identity()
    # Buscar al usuario en la base de datos
    tattooer = db.session.query(User).filter_by(id=tattooer_id).one_or_none()
    if tattooer is None:
        return jsonify({'msg': f'No se encontró un tatuador con el ID {tattooer_id}'}), 404

    # Verificar si el usuario tiene un perfil
    if tattooer.profile is None:
        return jsonify({'msg': f'El usuario con ID {tattooer_id} no tiene un perfil registrado'}), 404

    # verificar si current_user es el propietario del perfil antes de editar
    user = db.session.query(User).filter_by(id=current_user).one_or_none()
    if user is None:
        return jsonify({'msg': f'El usuario con ID {current_user} no tiene permisos para eliminar este perfil'}), 403

    # Obtener el perfil asociado
    profile = tattooer.profile

    # Eliminar el perfil de la base de datos
    db.session.delete(profile)
    db.session.commit()

    return jsonify({'msg': f'Perfil del usuario con ID {tattooer_id} eliminado exitosamente'}), 200


"""REVIEWS"""

#obtener las reviews de un tatuador
@api.route('/review/<int:tattooer_id>', methods=['GET']) 
def get_review_by_tattooer(tattooer_id):
#validar que exista un usuario con el tattooer_id que es el parametro que nos entregan
    tattooer= db.session.query(User).filter_by(id=tattooer_id).one_or_none() #consulta si existe un usuario o no y lo guarda en la variable tattooer
    if tattooer is None :
        return jsonify({'msg':f'no se encontro un usuario con el user_id {tattooer_id}'}),404
    reviews = db.session.query(Review).filter_by(tattooer_id=tattooer_id).all() 
    review_list = [review.serialize() for review in reviews]
    return jsonify(review_list),200

#para que un usuario cree una  review a un tatuador
@api.route('/review', methods=['POST'])
@jwt_required()
def create_review():
    current_user = get_jwt_identity()
    data = request.json

    user = db.session.query(User).filter_by(id=current_user).one_or_none()
    if user is None:
        return jsonify({'msg': f"No se encontró un usuario con el user_id {current_user}"}), 404

    tattooer = db.session.query(User).filter_by(id=data['tattooer_id']).one_or_none()
    if tattooer is None:
        return jsonify({"msg": f"No se encontró un usuario con el tattooer_id {data['tattooer_id']}"}), 404

    if user.user_type.name.lower() == 'tattoer':
        return jsonify({"msg": "Los tatuadores no pueden crear reviews"}), 403

    new_review = Review(
        description=data['description'],
        rating=data['rating'],
        user_id=current_user,
        tattooer_id=data['tattooer_id'],
        created_at=datetime.now()
    )

    db.session.add(new_review)

    # 🔔 Crear notificación automática al tatuador
    notification = Notification(
        message=f"{user.username} dejó una valoración en tu perfil",
        user_id=data['tattooer_id'],       # destinatario: el tatuador
        sender_id=current_user,            # quien deja la review
        is_read=False,
        type="valoracion",
        date=datetime.utcnow(),
        created_at=datetime.utcnow()
    )

    db.session.add(notification)

    # Commit de ambas cosas juntas
    db.session.commit()

    return jsonify(new_review.serialize()), 201


"""NOTIFICACIONES"""

#para obtener todas las notificaciones
@api.route('/notifications',methods=['GET'])
@jwt_required()
def get_all_notifications():
        current_user = get_jwt_identity()
        notifications = db.session.query(Notification).filter_by(user_id=current_user).all()
         # Si no hay notificaciones, devolver un mensaje vacío
        if not notifications:
            return jsonify({"msg": "No hay notificaciones disponibles",'notifications':[]}), 404
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
            return jsonify({"msg": f"No se encontró la notificación con el ID {notification_id}"}), 404
    # Si se encuentra, devolver la notificación en formato JSON
        return jsonify(notification.serialize()), 200

#para marcar como leida una notificacion
@api.route('/notification/<int:notification_id>/readed',methods=['PUT'])
@jwt_required()
def set_notification_readed(notification_id):
    current_id = get_jwt_identity()
    notification = db.session.query(Notification).filter_by(id=notification_id,user_id=current_id).one_or_none()
        # Si la notificación no existe, devolver un error 404
    if notification is None:
        return jsonify({"msg": f"No se encontró la notificación con el ID {notification_id}"}), 404
    # Marcar la notificación como leída (suponiendo que tiene un campo `readed`)
    notification.is_read = True
    db.session.commit()
    return jsonify({"success": True, "msg": "Notificación marcada como leída","notification":notification.serialize()}), 200

#para crear una notificacion, asignandola al usuario que se especifica en el body
@api.route('/notification',methods=['POST'])
@jwt_required()
def create_notification():
    current_user= get_jwt_identity()
    # Obtener datos del cuerpo de la petición
    data = request.json
    # Validar que los datos requeridos estén presentes
    if "msg" not in data or "user_id" not in data:
        return jsonify({"msg": "Faltan datos requeridos (msg, user_id)"}), 400
    # Crear una nueva instancia de Notificación
    new_notification = Notification(
        message=data["msg"],
        user_id=data["user_id"],
        is_read=False, # Inicialmente la notificación no está leída
        date =datetime.utcnow(),
        sender_id =current_user,
        type=data["type"],
        created_at =datetime.now()
    )
    # Guardar en la base de datos
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({"success": True, "msg": "Notificación creada con éxito", "notification": new_notification.serialize()}), 201
 
"""HOME"""

# Categorías: obtiene todos los perfiles de una categoría determinada.
@api.route('/profiles/category/<string:category>', methods=['GET'])
def get_profiles_by_category(category):

    profiles = db.session.query(Profile).filter_by(category=category).all()
    if not profiles:
        return jsonify({"msg": f"No se encontraron perfiles para la categoría '{category}'"}), 404
    result = [profile.serialize() for profile in profiles]
    return jsonify(result), 200


# Top Likes: obtiene los posts con más likes.
@api.route('/posts/top-likes', methods=['GET'])
def get_top_likes_posts():
    # Se obtienen los posts ordenados por likes en forma descendente
    posts = db.session.query(Post).order_by(Post.likes.desc()).limit(5).all()
    result = [post.serialize() for post in posts]
    return jsonify(result), 200


# Top Tatuadores: obtiene los perfiles con mejores evaluaciones.
@api.route('/profiles/top-tattooer', methods=['GET'])
def get_top_tattooer():
    # Se obtienen los perfiles ordenados por ranking en forma descendente, limitando a 10 resultados
    profiles = db.session.query(Profile).order_by(Profile.ranking.desc()).limit(10).all()
    result = [profile.serialize() for profile in profiles]
    return jsonify(result), 200


@api.route("/category/<string:category_name>", methods=["GET"])
def get_category_by_name(category_name):
    category=db.session.query(Category).filter_by(name=category_name).one_or_none()
    print(category)
    if category is None:
        return jsonify({"msg":"no hay categoria con ese nombre"}),404
    return jsonify({"category":category.serialize()}),200



"""API CORREO"""
@api.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        to_email = data.get("to")
        subject = data.get("subject", "Consulta desde TattooLink")
        message = data.get("message", "")

        if not to_email or not message:
            return jsonify({"msg": "Faltan campos requeridos"}), 400

        sg = sendgrid.SendGridAPIClient(api_key=os.getenv("SENDGRID_API_KEY"))
        email = Mail(
            from_email="matchtattoocontacto@gmail.com",
            to_emails=to_email,
            subject=subject,
            plain_text_content=message
        )
        response = sg.send(email)
        return jsonify({"msg": "Correo enviado", "status": response.status_code}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
