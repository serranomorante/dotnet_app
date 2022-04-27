> Ejercicio de programación 👨‍🔬

# HEH Shop
## Gestión de inventarios

HEH Shop es una aplicación web para la gestión de inventarios creada con C# + Postgres en el backend y React + Typescript en el frontend.


## Características

- Añade productos y actualiza el inventario disponible ⚡
- Añade clientes con información como: Nombres, apellidos, dirección, ciudad, etc. ⚡
- Genera órderes con información del cliente, producto y cantidad ⚡
- Visualiza los pedidos generados ⚡

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

> ⚠ Si usted desea, puede ejecutar el siguiente comando para asegurarse que ningún contenedor docker esté en ejecución y pueda interferir con el inicio de nuestro aplicativo.
```sh
docker stop $(docker ps -q -a)
```
Una vez instalados Docker y Docker Compose, procedemos con los pasos para iniciar nuestra aplicación

#### Importate, ejecutar los siguientes comandos con `Powershell (windows)`, `bash (linux)` o bien `zsh (mac)`

Clonamos el actual repositorio e ingresamos a la carpeta del proyecto
```sh
git clone https://github.com/serranomorante/heh_shop
cd heh_shop
```

Una vez dentro de la carpeta del proyecto, ejecutamos en el siguiente orden:
```sh
docker network create heh-shop-network
docker volume create --name=heh-shop-app
docker-compose up --build
```
Esperamos hasta ver la siguiente pantalla o similar:
[![N|Solid](https://i.postimg.cc/RVVW0kSv/Code-h-Ln-TMTz-EF3.png)](https://nodesource.com/products/nsolid)

Sin cerrar la consola de comando, nos dirigimos a nuestro navegador de preferencia y buscamos la siguiente url:
[localhost:1234](http://localhost:1234)
Y desde ahí podemos comenzar a navegar por el aplicativo.
