# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime

# db = SQLAlchemy()

# # User model for job seekers
# class User(db.Model):
#     __tablename__ = 'users'
#     user_id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(200), nullable=False)

#     # Relationships
#     notifications = db.relationship('Notification', backref='user', lazy=True)

# # Employer model for employers
# class Employer(db.Model):
#     __tablename__ = 'employers'
#     employer_id = db.Column(db.Integer, primary_key=True)
#     company_name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)

# # ConnectRequest model that represents requests between job seekers and employers
# class ConnectRequest(db.Model):
#     __tablename__ = 'connect_requests'
#     request_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     sender_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
#     receiver_id = db.Column(db.Integer, db.ForeignKey('employers.employer_id'), nullable=False)
#     status = db.Column(db.Enum('pending', 'accepted', 'rejected'), default='pending')
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

#     # Relationships
#     sender = db.relationship('User', foreign_keys=[sender_id], backref='sent_requests')
#     receiver = db.relationship('Employer', foreign_keys=[receiver_id], backref='received_requests')

# # Notification model that handles job seeker and employer notifications
# class Notification(db.Model):
#     __tablename__ = 'notifications'
#     notification_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     notification_type = db.Column(db.String(100), nullable=False)
#     sender_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
#     receiver_id = db.Column(db.Integer, db.ForeignKey('employers.employer_id'), nullable=False)
#     message = db.Column(db.String(255), nullable=False)
#     read_status = db.Column(db.Boolean, default=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

#     # Relationships
#     sender = db.relationship('User', foreign_keys=[sender_id], backref='sent_notifications')
#     receiver = db.relationship('Employer', foreign_keys=[receiver_id], backref='received_notifications')

#     # Helper method to convert the model data to a dictionary
#     def to_dict(self):
#         return {
#             'notification_id': self.notification_id,
#             'notification_type': self.notification_type,
#             'sender_id': self.sender_id,
#             'receiver_id': self.receiver_id,
#             'message': self.message,
#             'read_status': self.read_status,
#             'created_at': self.created_at
#         }
