> Ejercicio de programación 👨‍🔬

# C# + Typescript app

## Gestión de inventarios

Esta es una aplicación web para la gestión de inventarios creada en .NET (con C#) en el backend y React.js (con Typescript) en el frontend. La base de datos es Postgres. Todos en sus últimas versiones.

## Características

- Añade productos y actualiza el inventario disponible ⚡
- Añade clientes con información como: Nombres, apellidos, dirección, ciudad, etc. ⚡
- Genera órderes con información del cliente, producto y cantidad ⚡
- Visualiza los pedidos generados ⚡

## Características del proyecto

- Utiliza docker para facilitar el desarrollo y despliegue en producción
- Utiliza .devcontainer para un ambiente de desarrollo replicable en pocos segundos
- Es un monorepo, el frontend y el backend tienen una clara separación
- Sigue los principios SOLID y utiliza patrones de diseño

## [DEMO](https://dotnet.serranomorantepatricio.info)

## Pasos para iniciar la aplicación

La aplicación sólo requiere que [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) estén instalados en su sistema.
Adicional, los puertos 1234, 8080 y 5432 de su sistema deben estar disponibles.

Por favor asegúrese de seguir los pasos de instalación de dichas herramientas

- [Instalar Docker](https://docs.docker.com/engine/install/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

> Podemos comprobar la instalación de docker y docker compose de la siguiente manera:

```sh
docker --version
docker-compose --version
```

Estos comandos retornan las respectivas versiones de Docker y de Docker Compose.

> ⚠ Si usted desea, puede ejecutar el siguiente comando para asegurarse que ningún contenedor docker esté en ejecución ya que podría interferir con el arranque de nuestro aplicativo.

```sh
docker stop $(docker ps -q -a)
```

Una vez instalados Docker y Docker Compose, procedemos con los pasos para iniciar nuestra aplicación.

#### Importate, ejecutar los siguientes comandos con `Powershell (windows)`, `bash (linux)` o bien `zsh (mac)`

Clonamos el actual repositorio e ingresamos a la carpeta del proyecto

```sh
git clone https://github.com/serranomorante/dotnet_app
cd dotnet_app
```

Una vez dentro de la carpeta del proyecto, ejecutamos en el siguiente orden:

```sh
docker network create dotnet_app_network
docker-compose up --build
```

Esperamos hasta ver la siguiente pantalla o similar:
[![N|Solid](https://i.postimg.cc/RVVW0kSv/Code-h-Ln-TMTz-EF3.png)](https://nodesource.com/products/nsolid)

Sin cerrar la consola de comando, nos dirigimos a nuestro navegador de preferencia y buscamos la siguiente url:
[localhost:1234](http://localhost:1234)
Y desde ahí podemos comenzar a navegar por el aplicativo.

## Otros detalles

#### ¿Cómo acceder al shell (psql) de postgres?

Base de datos principal

```sh
docker-compose run --rm postgres psql -d postgres://$POSTGRES_USER@$POSTGRES_HOST/$POSTGRES_DB
```

Base de datos para tests

```sh
docker-compose run --rm postgres psql -d postgres://$POSTGRES_USER@$POSTGRES_HOST/$POSTGRES_TEST_DB
```
