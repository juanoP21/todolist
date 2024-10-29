# To-Do List API

Este es un proyecto de API de lista de tareas creado con el framework **NestJS** y **Node.js**, que permite a los usuarios gestionar tareas a través de endpoints REST. Utiliza **MySQL** como base de datos y ofrece autenticación con **JWT** para la seguridad. Está documentado con **Swagger** para facilitar su integración y uso.

## Tecnologías utilizadas

- **MySQL**: Base de datos relacional.
- **Swagger**: Documentación interactiva de la API.
- **JWT (Json Web Token)**: Autenticación segura de usuarios.
- **TypeORM**: ORM para la integración con MySQL.
- **Railway**: Plataforma para el despliegue en la nube.
- **Bcrypt**: Hashing de contraseñas para asegurar las credenciales de los usuarios.

# Configuración del proyecto

## 1. Instalación de dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las dependencias necesarias:

```bash
npm install
```

## 2. Configuración de variables de entorno (.env)

Crea un archivo .env en la raíz del proyecto y configura las variables de entorno de la base de datos. Estas variables son necesarias para conectar la base de datos MySQL y establecer las configuraciones de autenticación.
```
DB_TYPE=type DB
DB_HOST= 
DB_PORT=port
DB_USERNAME=user
DB_PASSWORD=password
DB_DATABASE=name DB
```

## 3. Compilación y ejecución del proyecto
Para iniciar el proyecto es el siguiente comando:
```bash
$ npm run start:dev
```
# Documentación de la API
Una vez que el servidor esté en funcionamiento, la documentación de Swagger estará disponible en
```
http://localhost:4000/api
```
