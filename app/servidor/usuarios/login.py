from .datos import usuarios

def validarLogin(usuario_ingresado, contrasena_ingresada):
    for usuario_id, usuario_data in usuarios.items():
        if usuario_data["nombre"] == usuario_ingresado and usuario_data["contrasena"] == contrasena_ingresada:
            return 200, "El usuario ingresado es correcto."
    
    return 401, "No se encontró el usuario o su contraseña es incorrecta."