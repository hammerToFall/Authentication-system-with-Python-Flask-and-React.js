"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import json
import os


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    try:
        email = request.json.get('email', None) # None: si no email en request =>email = None
        password = request.json.get('password', None)
        user = User(email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created"}), 200

    except Exception as e:  # Capturamos la excepcion dentro de la variable e y la imprimimos
        print(e)
        return jsonify({"message": f"error: {e}"}), 400   #f=format, le pasamos una variable dentro de {}

    # data = request.json()
    # print(data)
    # user = User(email=data.get('email'), password=data.get('password'))
    # # if user:
    # #     return jsonify({"message": "User already exist"}), 500
    # db.session.add(user)
    # db.session.commit()

    # return jsonify({"message": "user created"}), 200

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None) # None: si no email en request =>email = None
    password = request.json.get('password', None)

    user = User.query.filter_by(email = email, password = password).first()
    if not user:
        return jsonify({"message": "email or password is wrong, please try again"}), 400

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():

    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.serialize())