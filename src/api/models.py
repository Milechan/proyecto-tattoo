from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, ForeignKey, Boolean, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Profile(Base):
    __tablename__ = 'profile'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'), unique=True)
    social_media: Mapped[str] = mapped_column(String)
    bio: Mapped[str] = mapped_column(String)
    profile_picture: Mapped[str] = mapped_column(String)
    ranking: Mapped[int] = mapped_column(Integer)

    user: Mapped['User'] = relationship('User', back_populates='profile')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "social_media": self.social_media,
            "bio": self.bio,
            "profile_picture": self.profile_picture,
            "ranking": self.ranking
        }

class Review(Base):
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
            "created_at": self.created_at
        }

class Post(Base):
    __tablename__ = 'post'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    image: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    likes: Mapped[int] = mapped_column(Integer, default=0)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    created_at: Mapped[DateTime] = mapped_column(DateTime)

    user: Mapped['User'] = relationship('User', back_populates='posts')

    def serialize(self):
        return {
            "id": self.id,
            "image": self.image,
            "description": self.description,
            "likes": self.likes,
            "user_id": self.user_id,
            "created_at": self.created_at
        }

class Notification(Base):
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
            "date": self.date,
            "is_read": self.is_read,
            "message": self.message,
            "type": self.type,
            "created_at": self.created_at  # Corregido el typo aquí
        }

class User(Base):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    notification_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    user_type: Mapped[str] = mapped_column(String)
    created_at: Mapped[DateTime] = mapped_column(DateTime)

    profile: Mapped['Profile'] = relationship('Profile', back_populates='user', uselist=False)
    reviews: Mapped[list['Review']] = relationship('Review', back_populates='user', foreign_keys=[Review.user_id])
    posts: Mapped[list['Post']] = relationship('Post', back_populates='user')
    notifications: Mapped[list['Notification']] = relationship('Notification', back_populates='user', foreign_keys=[Notification.user_id])

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "email": self.email,
            "notification_enabled": self.notification_enabled,
            "user_type": self.user_type,
            "created_at": self.created_at,
            "profile": self.profile.serialize() if self.profile else None,
            "reviews": [review.serialize() for review in self.reviews],
            "posts": [post.serialize() for post in self.posts],
            "notifications": [notification.serialize() for notification in self.notifications]
        }
