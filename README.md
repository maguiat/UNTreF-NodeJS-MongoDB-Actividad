# API de Frutas con Node.js, Express y MongoDB
Este proyecto es una API RESTful desarrollada para gestionar una colección de frutas. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) y realizar búsquedas personalizadas.

## Actividad Propuesta
El objetivo principal de esta actividad es definir y desarrollar nuevos endpoints para extender la funcionalidad de la API.

### Nuevos Endpoints a Implementar:
*     /frutas/nombre/:nombre

    * __Objetivo__: Buscar y retornar todas las frutas que contengan en su nombre el texto (o parte del texto) informado como parámetro.

    * __Tecnología__: Se debe utilizar el método ```.find()``` de MongoDB en conjunto con Expresiones Regulares (RegExp) para realizar una búsqueda flexible e insensible a mayúsculas y minúsculas.

*     /frutas/importe/:precio

    * __Objetivo__: Buscar y retornar todas las frutas que tengan un precio igual o superior al informado en el parámetro.

    * __Tecnología__: Se debe utilizar el método ```.find()``` con los operadores de consulta de MongoDB (en este caso, $gte para "mayor o igual que").

En ambos casos, se utilizará el método ```.toArray()``` para asegurar que la respuesta pueda devolver un array con múltiples resultados si es necesario.

## Pruebas y Brainstorming de Endpoints
Para asegurar la robustez y calidad de la API, es fundamental probar no solo el "camino feliz" (cuando todo funciona como se espera), sino también cómo se comporta la API ante datos inesperados o inválidos.

### Ideas para Pruebas (Válidas e Inválidas):
*     GET /frutas/nombre/:nombre

    * __Valores Válidos__: ```Manzana```, ```man```, ```Ana``` (debería encontrar "Manzana" y "Banana").

    * __Valores Inválidos__: Nombres muy cortos, números (```123```), o nombres de frutas que no existen en la base de datos.

*     POST /frutas

    * __Valores Válidos__: Un JSON con ```nombre``` (string), ```precio``` (número positivo) y una ```imagen``` (emoji o URL).

    * __Valores Inválidos__: Un JSON sin el campo nombre, con un precio negativo, o con un nombre que no sea un string.

*     DELETE /frutas/:id

    * __Valores Válidos__: Un ```_id``` existente de un documento en MongoDB.

    * __Valores Inválidos__: Un ```_id``` que ya fue borrado o que nunca existió, un id con un formato incorrecto (ej: 123, id-invalido).

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

