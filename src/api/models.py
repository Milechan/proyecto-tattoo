from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Profile(Base):
    __tablename__ = 'profile'
    id :Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer)
    social_media: Mapped[str] = mapped_column(String)
    bio: Mapped[str] = mapped_column(String)
    profile_picture: Mapped[str] = mapped_column(String) 
    ranking: Mapped[int] = mapped_column(Integer)
    def serialize(self):
        return{
            "id":self.id,
            "user_id":self.user_id,
            "social_media":self.user_media,
            "bio":self.bio,
            "profile_picture":self.profile_picture,
            "ranking":self.ranking
        }
    
class Review(Base):
    __tablename__ = 'review'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    description: Mapped[str] = mapped_column(String)
    rating: Mapped[int] = mapped_column(Integer)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    tattooer_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    created_at: Mapped[DateTime] = mapped_column(DateTime)
    def serialize(self):
        return{
            "id":self.id,
            "description":self.description,
            "rating":self.rating,
            "user_id":self.user_id,
            "tattooer_id":self.tattooer_id,
            "created_at":self.created_at
        }

class Post(Base):
    __tablename__ = 'post'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    image: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    likes: Mapped[int] = mapped_column(Integer)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    created_at: Mapped[DateTime] = mapped_column(DateTime)
    def serialize(self):
        return{
            "id":self.id,
            "image":self.image,
            "description":self.description,
            "likes":self.likes,
            "user_id":self.user_id,
            "created_at":self.created_at
                            }


class Notification(Base):
    __tablename__ = 'notification'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    date: Mapped[DateTime] = mapped_column(DateTime)
    is_read: Mapped[bool] = mapped_column(Boolean)
    message: Mapped[str] = mapped_column(Text)
    type: Mapped[str] = mapped_column(String)
    created_at: Mapped[DateTime] = mapped_column(DateTime)
    def serialize(self):
        return{
            "id":self.id,
            "user_id":self.user_id,
            "sender_id":self.sender_id,
            "date":self.date,
            "is_read":self.is_read,
            "message":self.message,
            "type":self.type,
            "create_at":self.created_at
        }



class User(Base):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    notification_enabled: Mapped[bool] = mapped_column(Boolean)
    user_type: Mapped[str] = mapped_column(String)
    created_at: Mapped[DateTime] = mapped_column(DateTime)
    reviews: Mapped[list['Review']] = relationship('Review', back_populates='user')
    posts: Mapped[list['Post']] = relationship('Post', back_populates='user')
    notifications: Mapped[list['Notification']] = relationship('Notification', back_populates='user')
    def serialize(self):
        return{
            "id":self.id,
            "name":self.name,
            "username":self.username,
            "email":self.email,
            "notification_enabled":self.notification_enabled,
            "user_type":self.user_type,
            "created_at":self.created_at,
            "reviews":self.reviews,
            "posts":self.posts,
            "notifications":self.notifications
        }
    