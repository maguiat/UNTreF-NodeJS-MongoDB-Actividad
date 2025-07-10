# API de Frutas con Node.js, Express y MongoDB
Este proyecto es una API RESTful desarrollada para gestionar una colección de frutas. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) y realizar búsquedas personalizadas.

## Actividad Propuesta
El objetivo principal de esta actividad es definir y desarrollar nuevos endpoints para extender la funcionalidad de la API.
En estos endpoints, deberás utilizar el método ```.find().toArray()```, para que devuelva más 
de un resultado.
También deberás integrar Expresiones Regulares. JavaScript las trabaja de forma 
nativa con el objeto ```RegExp()```.

### Nuevos Endpoints a Implementar:
*     /frutas/nombre/:nombre


*     /frutas/importe/:precio



Documentación de la API
A continuación se detallan todos los endpoints disponibles.

| URL | Descripción | Método |
|:------:|-----|-------------|
|```http://localhost:3008/```| La URL o ruta principal | GET
|```http://localhost:3008/frutas```|  La URL general para visualizar todos los productos | GET
|```http://localhost:3008/frutas/:id```|  La URL que nos retorna un producto por su ID | GET
|```http://localhost:3008/frutas/nombre/:nombre```|  La URL que nos retorna un producto por su nombre | GET
|```http://localhost:3008/frutas/importe/:precio```|  La URL que nos retorna un producto por precio aproximado | GET
|```http://localhost:3008/frutas/```|  La URL que nos permite dar de alta un recurso | POST
|```http://localhost:3008/frutas/:id```|  La URL que nos permite modificar un recurso existente  | PATCH
|```http://localhost:3008/frutas/:id```|  La URL que nos permite eliminar un recurso | DELETE

