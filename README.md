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
- [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.

__IMPORTANTE__: Dentro de la Ruta Principal se deben mostrar tanto los videjuegos traidos desde la API como así también los de la base de datos. Debido a que en la API existen alrededor de 500 mil juegos, por cuestiones de performance pueden tomar la simplificación de obtener y paginar los primeras 100.

__Ruta de detalle de videojuego__: debe contener

- [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
- [ ] Descripción
- [ ] Fecha de lanzamiento
- [ ] Rating
- [ ] Plataformas

__Ruta de creación de videojuegos__: debe contener

- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
- [ ] Posibilidad de seleccionar/agregar varios géneros
- [ ] Posibilidad de seleccionar/agregar varias plataformas
- [ ] Botón/Opción para crear un nuevo videojuegob



## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada ``

El contenido de `client` fue creado usando: Create React App.



## Horarios y Fechas

El proyecto tendrá una duración máxima de tres semanas. En el caso de que completan todas las tareas antes de dicho lapso podrán avisar a su Instructor para coordinar una fecha de presentación del trabajo (DEMO).

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

- __Node__: 12.18.3 o mayor
- __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

```bash
node -v
npm -v
```

__ACLARACIÓN:__ Las dependencias actuales se encuentran en las versiones que venimos trabajando durante el bootcamp.

Versiones:

- __react__: 17.0.1
- __react-dom__: 17.0.1
- __react-router-dom__: 5.2.0
- __redux__: 4.0.5
- __react-redux__: 7.2.3

Está permitido, __bajo su responsabilidad__, actualizar las dependencias a versiones más actuales.

> __IMPORTANTE:__ Versiones mas actuales podrían presentar configuraciones diferentes respecto a las versiones en las que venimos trabajando durante el bootcamp.


