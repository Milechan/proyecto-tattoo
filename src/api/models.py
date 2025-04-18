from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class UserType(db.Model):
    __tablename__ = 'user_type'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    users: Mapped[list['User']] = relationship('User', back_populates='user_type')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Likes(db.Model):
    __tablename__ = 'likes'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    post_id: Mapped[int] = mapped_column(Integer, ForeignKey('post.id'))

    user: Mapped['User'] = relationship('User', back_populates='likes')
    post: Mapped['Post'] = relationship('Post', back_populates='likes')
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id
        }

class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    notification_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    user_type_id: Mapped[int] = mapped_column(Integer, ForeignKey('user_type.id'))
    category_id: Mapped[int] = mapped_column(Integer, ForeignKey('category.id'), nullable=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime,nullable=True)

    category: Mapped['Category'] = relationship('Category', back_populates="users")
    user_type: Mapped['UserType'] = relationship('UserType', back_populates='users')
    profile: Mapped['Profile'] = relationship('Profile', back_populates='user', uselist=False)
    reviews: Mapped[list['Review']] = relationship('Review', back_populates='user', foreign_keys='Review.user_id')
    posts: Mapped[list['Post']] = relationship('Post', back_populates='user')
    notifications: Mapped[list['Notification']] = relationship('Notification', back_populates='user', foreign_keys='Notification.user_id')
    likes: Mapped[list['Likes']] = relationship('Likes', back_populates='user', cascade="all, delete-orphan")

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "email": self.email,
            "notification_enabled": self.notification_enabled,
            "user_type": self.user_type.serialize() if self.user_type else None,
            "created_at": self.created_at,
            "category": self.category.serialize() if self.category else None,
            "profile": self.profile.serialize() if self.profile else None,
            "reviews": [review.serialize() for review in self.reviews],
            "posts": [post.serialize() for post in self.posts],
            "notifications": [notification.serialize() for notification in self.notifications]
        }

    def serialize_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username
        }

class Profile(db.Model):
    __tablename__ = 'profile'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'), unique=True)
    social_media_insta: Mapped[str] = mapped_column(String, nullable=True)
    social_media_wsp: Mapped[str] = mapped_column(String, nullable=True)
    social_media_x: Mapped[str] = mapped_column(String, nullable=True)
    social_media_facebook: Mapped[str] = mapped_column(String, nullable=True)
    bio: Mapped[str] = mapped_column(String)
    profile_picture: Mapped[str] = mapped_column(String)
    banner: Mapped[str] = mapped_column(String, nullable=True)
    ranking: Mapped[int] = mapped_column(Integer)
    category_id: Mapped[int] = mapped_column(Integer, ForeignKey('category.id'))
    latitude: Mapped[float] = mapped_column(Float, nullable=True)
    longitude: Mapped[float] = mapped_column(Float, nullable=True)
    location_text: Mapped[str] = mapped_column(String, nullable=True)
    user: Mapped['User'] = relationship('User', back_populates='profile')
    category: Mapped['Category'] = relationship('Category', back_populates="profiles")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "profile_name":self.user.username,
            "email": self.user.email,
            "social_media_insta": self.social_media_insta,
            "social_media_wsp": self.social_media_wsp,
            "social_media_x": self.social_media_x,
            "social_media_facebook": self.social_media_facebook,
            "bio": self.bio,
            "profile_picture": self.profile_picture,
            "banner": self.banner,
            "category_banner":self.category.image,
            "ranking": self.ranking,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "location_text": self.location_text
        }

class Review(db.Model):
    __tablename__ = 'review'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    description: Mapped[str] = mapped_column(String)
    rating: Mapped[int] = mapped_column(Integer)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    tattooer_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    created_at: Mapped[DateTime] = mapped_column(DateTime)

    user: Mapped['User'] = relationship('User', back_populates='reviews', foreign_keys=[user_id])
    tattooer: Mapped['User'] = relationship('User', foreign_keys=[tattooer_id])

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "rating": self.rating,
            "user_id": self.user_id,
            "tattooer_id": self.tattooer_id,
            "created_at": self.created_at,
            "user": self.user.serialize_basic() if self.user else None
        }

class Post(db.Model):
    __tablename__ = 'post'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    image: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    created_at: Mapped[DateTime] = mapped_column(DateTime,nullable=True)

    user: Mapped['User'] = relationship('User', back_populates='posts')
    likes: Mapped[list['Likes']] = relationship('Likes', back_populates='post', cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "image": self.image,
            "description": self.description,
            "likes": len(self.likes),
            "user_id": self.user_id,
            "created_at": self.created_at
        }

class Notification(db.Model):
    __tablename__ = 'notification'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    date: Mapped[DateTime] = mapped_column(DateTime)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    message: Mapped[str] = mapped_column(Text)
    type: Mapped[str] = mapped_column(String)
    created_at: Mapped[DateTime] = mapped_column(DateTime)

    user: Mapped['User'] = relationship('User', back_populates='notifications', foreign_keys=[user_id])
    sender: Mapped['User'] = relationship('User', foreign_keys=[sender_id])

    def serialize(self):
        return {
            "id": self.id, 
            "user_id": self.user_id,
            "sender_id": self.sender_id,
            "sender": self.sender.serialize_basic() if self.sender else None,  # ✅ Agregado
            "date": self.date,
            "is_read": self.is_read,
            "message": self.message,
            "type": self.type,
            "created_at": self.created_at
        }

class Category(db.Model):
    __tablename__ = 'category' 
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] =mapped_column(String, unique=True)
    description: Mapped[str] =mapped_column(String, nullable=True)
    image: Mapped[str] =mapped_column(String, nullable=True)
    carousel: Mapped[str] = mapped_column(String, nullable=True)
    profiles: Mapped[list['Profile']] = relationship('Profile', back_populates="category")
    users: Mapped[list['User']] = relationship('User', back_populates="category")

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image": self.image,
            "profiles":[profile.serialize() for profile in self.profiles],
            "carousel":self.carousel
        }