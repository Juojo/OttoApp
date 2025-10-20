import json, sys

ruta_usuarios = "../datos/usuarios.json"
ruta_productos = "../datos/productos.json"

def leerArchivoJson(ruta_archivo):
    if ruta_archivo == "u": ruta_archivo = ruta_usuarios
    elif ruta_archivo == "p": ruta_archivo = ruta_productos

    try:
        archivo = open(ruta_archivo, "r", encoding="utf-8", newline="\n") # Abre el archivo como read only
        
        datos = {}
        try:
            datos = json.load(archivo)
        except json.JSONDecodeError:
            print("Error al decodificar el archivo JSON.")

        return datos
    except FileNotFoundError as e:
        print("No se encontro el archivo:", e)
        sys.exit(1) # Se finaliza el programa si ocurre un error
    except Exception as e:
        print("Ocurrio un error con la lectura del archivo:", e)
        sys.exit(1) # Se finaliza el programa si ocurre un error

def agregarUsuarioNuevo(usuario_nuevo, usuarios):
    ultimo_id = list(usuarios.keys())[-1]
    nuevo_id = generarNuevoIdUsuario(ultimo_id)

    usuario_empaquetado = {
        nuevo_id: usuario_nuevo
    }

    # Almacena en memoria el nuevo usuario
    usuarios.update(usuario_empaquetado)
    
    # Almacena en el json el nuevo usuario
    try:
        with open(ruta_usuarios, "w", encoding="utf-8") as archivo: # Abre el archivo en append mode (Escribe al final del arhivo)
            json.dump(usuarios, archivo, indent=4)
            archivo.write("\n")
        return True
    except Exception as e:
        print("\nError al guardar el nueo usuario:", e)
        return False
    
def agregarNuevoProducto(producto_nuevo, productos):
    ultimo_id = list(productos.keys())[-1]
    nuevo_id = generarNuevoIdUsuario(ultimo_id)

    usuario_empaquetado = {
        nuevo_id: producto_nuevo
    }

    productos.update(usuario_empaquetado)
    
    try:
        with open(ruta_productos, "w", encoding="utf-8") as archivo:
            json.dump(productos, archivo, indent=4)
            archivo.write("\n")
        return True
    except Exception as e:
        print("\nError al guardar el nueo producto:", e)
        return False
    
def generarNuevoIdUsuario(ultimo_id):
    numero = int(ultimo_id.split("_")[1])
    nuevo_id = f"usr_{numero + 1}"
    return nuevo_id