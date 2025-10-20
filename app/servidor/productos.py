import manejo_archivos

productos = manejo_archivos.leerArchivoJson("p")

def obtenerProducto(id):
    cod_id = "prod_"+id

    if cod_id in productos:
        return 200, "Se encontro el producto", productos[cod_id]
    else:
        return 404, "No se encontro el producto", None
    
def obtenerProductos():
    return 200, productos

def crearProducto():
    manejo_archivos.agregarNuevoProducto()