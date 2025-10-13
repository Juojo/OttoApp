import manejo_archivos
from .datos import usuarios

import re

def registrarUsuario(nombre_usuario_nuevo, contrasena_nueva, mail_nuevo):
    usuario_valido = validarNombreUsuario(nombre_usuario_nuevo, usuarios)
    if not usuario_valido[0]:
        return 400, usuario_valido[1]

    contrasena_valida = validarContrasena(contrasena_nueva)
    if not contrasena_valida[0]:
        return 400, contrasena_valida[1]

    usuario = empaquetarUsuario(nombre_usuario_nuevo, contrasena_nueva, mail_nuevo)
    manejo_archivos.agregarUsuarioNuevo(usuario, usuarios)
    return 200, "El usuario se creo exitosamente."

def empaquetarUsuario(nombre_usuario_nuevo, contrasena_nueva, mail_nuevo):
    return {
        "nombre": nombre_usuario_nuevo,
        "contrasena": contrasena_nueva,
        "mail": mail_nuevo
    }

def validarNombreUsuario(nombre_usuario_nuevo, usuarios):
    if nombre_usuario_nuevo == "":
        return False, "El nombre de usuario no puede estar vacio"

    for usuario_id, usuario_data in usuarios.items():
        if usuario_data["nombre"] == nombre_usuario_nuevo:
            return False, "El nombre de usuario ya existe"

    return True, "El nombre de usuario es correcto"

def validarContrasena(contrasena):
    if len(contrasena) < 8:
        return False, "La contrasena no puede tener menos de 8 caracteres"
    else:
        return True, ""