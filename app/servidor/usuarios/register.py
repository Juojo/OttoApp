import manejo_archivos
from .datos import usuarios

import re

def registrarUsuario(nombre_usuario_nuevo, contrasena_nueva, mail_nuevo):
    usuario_valido = validarNombreUsuario(nombre_usuario_nuevo, usuarios)
    if not usuario_valido[0]:
        return 400, usuario_valido[1]

    # validar email agregado
    email_valido = validarEmail(mail_nuevo)
    if not email_valido[0]:
        return 400, email_valido[1]

    contrasena_valida = validarContrasena(contrasena_nueva)
    if not contrasena_valida[0]:
        return 400, contrasena_valida[1]

    usuario = empaquetarUsuario(nombre_usuario_nuevo, contrasena_nueva, mail_nuevo)
    manejo_archivos.agregarUsuarioNuevo(usuario, usuarios)
    return 200, "El usuario se creo exitosamente."

def validarEmail(email):
    """
    Verifica que:
    - haya más de 5 caracteres antes del '@' (es decir, longitud >= 6)
    - el dominio contenga '.com' y opcionalmente un sufijo como '.ar' (ej: .com.ar)
    """
    if not isinstance(email, str) or email.strip() == "":
        return False, "El email no puede estar vacío"
    email = email.strip()
    # Antes de @: al menos 6 caracteres no blancos ni '@'
    # Dominio: algo como dominio.com o dominio.com.ar (se permite cualquier sufijo de 2+ letras después de .com)
    pattern = r'^[^\s@]{5,}@[A-Za-z0-9-]+\.com(?:\.[A-Za-z]{2,})?$'
    if not re.match(pattern, email, re.IGNORECASE):
        return False, "El email debe tener más de 5 caracteres antes de '@' y terminar en .com (opcionalmente .com.ar)"
    return True, ""

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