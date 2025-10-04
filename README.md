# Proyecto Reto Tecnico CIVA

Este proyecto es una aplicación web desarrollada con **React** en el frontend y **Spring Boot** en el backend, conectada a una base de datos **PostgreSQL**.
El sistema permite gestionar buses y usuarios, con autenticación mediante **JWT** y funcionalidades de CRUD para los registros.

---

## Índice

1. [Tecnologías](#tecnologías)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Instalación y ejecución](#instalación-y-ejecución)
4. [Demostración](#demostración)
5. [Backend](#backend)
6. [Base de datos](#base-de-datos)
7. [Autores](#autores)

---

## Tecnologías

* **Frontend:** React, HTML, CSS, JavaScript
* **Backend:** Spring Boot, Java, JPA/Hibernate
* **Base de datos:** PostgreSQL
* **Autenticación:** JWT
* **Control de versiones:** Git

---

## Estructura del proyecto

```
/
├── frontend/
├── backend/
├── img_readme/
├── README.md
└── .gitignore
```

---

## Instalación y ejecución

1. **Clonar el repositorio:**

```bash
git clone <url_del_repositorio>
```

2. **Frontend:**

```bash
cd frontend
npm install
npm start
```

3. **Backend:**

```bash
cd backend
./mvnw spring-boot:run
```

4. **Base de datos:**
   Configurar PostgreSQL con las credenciales en `application.properties` o `application.example.properties`.

---

## Demostración

### Portada

![Portada](./img_readme/img_1.jpeg)

### Login

![Login](./img_readme/img_2.jpeg)
*El login permite acceder al sistema y generar un JWT para la sesión.*

### JWT generada

![JWT](./img_readme/img_3.jpeg)
*Se muestra la alerta con la JWT obtenida tras iniciar sesión correctamente.*

### Registro de usuario

![Register](./img_readme/img_7.jpeg)
*Formulario de registro.*

---

## Funcionalidades del sistema

### Búsqueda por ID

#### Resultado encontrado

![Resultado encontrado](./img_readme/img_5.jpeg)

#### Resultado no encontrado

![Resultado no encontrado](./img_readme/img_6.jpeg)

### Tablas y datos

![Tabla principal](./img_readme/img_4.jpeg)

---

## Backend

### Código del REST Controller

![REST Controller](./img_readme/cod_1.jpeg)

---

## Base de datos

### Tablas en PostgreSQL

![Tabla 1](./img_readme/tabla_1.jpeg)
![Tabla 2](./img_readme/tabla_2.jpeg)
![Tabla 3](./img_readme/tabla_3.jpeg)

---

## Autor

* Daniel Castañeda

---
