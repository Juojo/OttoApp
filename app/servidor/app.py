from flask import Flask, request, jsonify
from flask_cors import CORS

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
        "success": True,
        "message": "Usuario creado exitosamente",
        "usuario": usuario
    }), 200

if __name__ == "__main__":
    app.run(debug=True)