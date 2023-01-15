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
    category,
    image,
    location,
    menu,
    event, ( boolean? enum),
    capacity,
    promo,
    pet-friendly,
    schedule,
    age-range?,
    phone,
    book-price,(15%)
    available, ( boolean )
}

Book:{
    name,
    date,
    person-quantity,
    price-quantity,
    code-prom,
}

User:{
    id, (mail),
    name,
    password,
    phone,
    image,
    birthday,
    city,
}

RUTAS BACK

- [ ] __GET /places__:
  - Obtener un listado de los bares/discotecas
  - Debe devolver solo los datos necesarios para la ruta principal

- [ ] __GET /places?name="..."__:
  - Obtener un listado de las primeros 15 bar/discoteca que contengan la palabra ingresada como query parameter
  - Si no existe ninguno mostrar un mensaje adecuado

- [ ] __GET /place/{idPlace}__:
  - Obtener el detalle del bar/discoteca en particular
  - Debe traer solo los datos pedidos en la ruta de detalle del bar/discoteca
  - Incluir las reservas disponibles(admin scheduled)

- [ ] __GET /place/{idBook}__:
- Obtener el detalle de la reserva

- [ ] __POST /create-user__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación del usuario por body
  - Crea un usuario en la base de datos, relacionado a su reserva.

  - [ ] __POST /create-place__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de bar/discoteca por body
  - Crea un bar/discoteca en la base de datos, relacionado a sus géneros.

- [ ] __POST /create-book__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de reserva por body
  - Crea una reserva en la base de datos, relacionado a sus géneros.

- [ ] __PUT /place/{idPlace}__:
  - modificar los datos adoptados en el detalle del bar/discoteca
  - implementar borrado logico en caso de clausura, cierre de temporada, reforma, fuera de horario

  - [ ] __DELETE /places__:
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
- [ ] Botones/Opciones para filtrar por categoria 
- [ ] Botones/Opciones para ordenar por edades y ubicacion
- [ ] Paginado para ir buscando y mostrando los siguientes bares, 15 bares por pagina, mostrando los primeros 15 en la primer pagina. (Otra opcion es que haya un boton 
      "+" para ir agregando mas bares, en lugar del paginado tradicional)

__Rute de detalle__: debe contener
- [ ] nombre,categorias,imagen,locacion,menu, eventos (si los hay), capacidad, promos, pet-friendly, horarios, rango etario?, telefono, precio de reserva.

__Ruta de creación de reservas (Form#1): debe contener
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  -nombre de quien reserva,
  -fecha
  -cantidad de personas
  -codigo de promocion

__Ruta de registro de usuario Cliente (Form#2):
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  -nombre
  -mail
  -contrasena
  -numero de telefono
  -imagen
  -fecha de cumpleanos
  -ciudad

__Ruta de registro de usuario Dueno bar (Form#3):
  -podriamos hacer el registro de dueno de bar y creacion de bares, en un solo form
__Ruta de creación de bares (Form#4):

PANEL DE ADMIN BARES
-Posibilidad de actualizar datos del bar

PANEL DE ADMIN DE LA APP
-Posibilidad de borrar bares

