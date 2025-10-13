from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS  # type: ignore
from dotenv import load_dotenv # type: ignore
import os

import usuarios.register
import usuarios.login

load_dotenv('../cliente-web/.env')

app = Flask(__name__)
CORS(app)

@app.route("/api/hello")
def hello():
    return "Hello, World!"

@app.route("/api/crearUsuario", methods = ['POST'])
def crearUsuario():
    usuario = request.get_json()
    
    nombre_usuario = usuario.get('fullName')
    email = usuario.get('email')
    password = usuario.get('password')

    respuesta = usuarios.register.registrarUsuario(nombre_usuario, password, email)

    return jsonify({
        "message": respuesta[1],
        "usuario": usuario
    }), respuesta[0]

@app.route("/api/loginUsuario", methods = ['POST'])
def loginUsuario():
    usuario = request.get_json()
    
    nombre_usuario = usuario.get('username')
    password = usuario.get('password')

    respuesta = usuarios.login.validarLogin(nombre_usuario, password)

    return jsonify({
        "message": respuesta[1],
    }), respuesta[0]

if __name__ == "__main__":
    host = os.getenv('SERVER_HOST')
    puerto = int(os.getenv('SERVER_PORT'))

    app.run(host=host, port=puerto, debug=True)