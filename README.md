
![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)


# Final Project - Henry Grupo 13

<p align="left">
<img src="https://style.shockvisual.net/wp-content/uploads/2019/10/beer-background-ZC2QTEK.jpg" alt=""/>
</p>

# Grupo13-PF Intrucciones para no terminar matandonos.

MODELOS

Place:{
    id, (mail)
    name,
    category, (disco, bar, pub)
    <!-- category2, (proximo sprint) -->
    image,
    location,
    menu,
    event, ( boolean? enum),
    capacity,
    pet-friendly,
    schedule,
    age-range?,
    phone,
    promo,
    book-price,(15%)
    available, ( boolean )
    <!-- rating?(proximo sprint) -->
}

Book:{
    name,
    reservedDate, (para cuándo es la reserva)
    createdAt,
    updatedAt,
    personQuantity,
    codeProm,
}

User:{
    id, (mail),
    name,
    password,
    phone,
    image,
    birthday,
    city,
<!--     propietario, ? renderizar form de creación de place : no renderizar nada-->
<!--     admin:? -->
}

RUTAS BACK





- [ ] __GET /local__:
  - Obtener un listado de los bares/discotecas
  - Debe devolver solo los datos necesarios para la ruta principal

- [ ] __GET /local__?name="..."__:
  - Obtener un listado de las primeros 15 bar/discoteca que contengan la palabra ingresada como query parameter
  - Si no existe ninguno mostrar un mensaje adecuado

- [ ] __GET /local/{idLocal}__:
  - Obtener el detalle del bar/discoteca en particular
  - Debe traer solo los datos pedidos en la ruta de detalle del bar/discoteca
  - Incluir las reservas disponibles(admin scheduled)

- [ ] __GET /local/{idBook}__:
- Obtener el detalle de la reserva


- [ ] __GET /user{idUser}__:
  - Obtener el detalle de un usuario (cuando ingresa a su perfil)
  - Debe devolver solo los datos necesarios para la ruta principal

- [ ] __PUT /user__:
  - Debe actualizar los datos de un usuario (modificar los datos de su propio perfil)
  - Debe actualizar solo los datos necesarios para la ruta principal
  
- [ ] __DELETE /user{idUser}__:
  - Debe eliminar el usuario en cuestión
  - Debe devolver solo los datos necesarios para la ruta principal




- [ ] __POST /create-user__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación del usuario por body
  - Crea un usuario en la base de datos, relacionado a su reserva.

  - [ ] __POST /local__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de bar/discoteca por body
  - Crea un bar/discoteca en la base de datos, relacionado a sus géneros.

- [ ] __POST /create-book__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de reserva por body
  - Crea una reserva en la base de datos, relacionado a sus géneros.

- [ ] __PUT /Local/{idLocal}__:
  - modificar los datos adoptados en el detalle del bar/discoteca
  - implementar borrado logico en caso de clausura, cierre de temporada, reforma, fuera de horario

- [ ] __PUT /place/{idBook}__:
  - Elimina de la base de datos el bar/discoteca

- [ ] __DE /place/{idBook}__:
  - Elimina de la base de datos el bar/discoteca

- [ ] __PUT /places__:
  - Elimina de la base de datos el bar/discoteca


RUTAS FRONT

__Ruta principal__: debe contener

- [ ] Input de búsqueda para encontrar bar/discoteca por nombre
- [ ] Área donde se verá el listado de bar/discoteca. Deberá mostrar su:
  - Imagen
  - Nombre
  - Categoria
  - Ubicacion
  - Edades
  <!-- - Puntuacion (proximo sprint) --> 
- [ ] Botones/Opciones para filtrar por categoria y pet-friendly
- [ ] Botones/Opciones para ordenar por edades y ubicacion
- [ ] Botones/Opciones para ordenar por rating
- [ ] Botones/Opciones para ordenar por nombre.

- [ ] Paginado para ir buscando y mostrando los siguientes bares, 15 bares por pagina, mostrando los primeros 15 en la primer pagina. (Otra opcion es que haya un boton 
      "+" para ir agregando mas bares, en lugar del paginado tradicional)

__Rute de detalle__: debe contener
- [ ] nombre,categorias,imagen,locacion,menu, eventos (si los hay), capacidad, promos, pet-friendly, horarios, rango etario?, telefono, precio de reserva.

__Ruta de creación de reservas (Form#1): debe contener
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  -nombre de quien reserva,
  -fecha
  -cantidad de personas
  -precio de reserva
  -codigo de promocion

__Ruta de registro de usuario Cliente (Form#2):
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  -nombre
  -mail
  -contraseña
  -numero de telefono
  -imagen
  -fecha de cumpleaños
  -ciudad

__Ruta de creación de bares (Form#3):
  - un formulario que pida todos los datos del bar y al usuario le cambia la propiedad owner

__Ruta about
__Ruta favoritos
__Ruta inicio de sesion

