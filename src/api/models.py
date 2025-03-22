from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Profile(Base):
    __tablename__ = 'profile'
    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    social_media: Mapped[str] = mapped_column(String)
    bio: Mapped[str] = mapped_column(String)
    profile_picture: Mapped[str] = mapped_column(String) 
    ranking: Mapped[int] = mapped_column(Integer)

class Review(Base):
    __tablename__ = 'review'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    description: Mapped[str] = mapped_column(String)
    rating: Mapped[int] = mapped_column(Integer)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    tattooer_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    created_at: Mapped[DateTime] = mapped_column(DateTime)

class Post(Base):
    __tablename__ = 'post'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    image: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    likes: Mapped[int] = mapped_column(Integer)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    created_at: Mapped[DateTime] = mapped_column(DateTime)

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

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }