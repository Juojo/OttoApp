from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv('../cliente-web/.env')

app = Flask(__name__)
CORS(app)

@app.route("/api/hello")
def hello():
    return "Hello, World!"

@app.route("/api/crearUsuario", methods = ['POST'])
def crearUsuario():
    usuario = request.get_json()
    print(usuario)

    return jsonify({
        "message": "Usuario creado exitosamente",
        "usuario": usuario
    }), 200

if __name__ == "__main__":
    host = os.getenv('SERVER_HOST')
    puerto = int(os.getenv('SERVER_PORT'))

    app.run(host=host, port=puerto, debug=True)