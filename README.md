# Gestión de Contingencias Satelitales (GCS) — v1.1.0

Plataforma web centralizada diseñada para la optimización y unificación de la gestión operativa de contingencias en la infraestructura satelital de **CANTV**. El sistema actúa como un nodo de información crítico que conecta las unidades operativas de **Caracas, Camatagua y Baemari**, garantizando la trazabilidad y la continuidad del servicio de telecomunicaciones nacional.

## 🚀 Descripción del Proyecto
El **GCS** resuelve la fragmentación de información en la gestión de fallas y mantenimientos, permitiendo que los reportes generados en diferentes estaciones terrestres sean visibles, auditables y gestionables desde una única interfaz segura.

### 🛠️ Tecnologías Utilizadas
*   **Frontend:** ReactJS con arquitectura basada en componentes y consumo de APIs REST.
*   **Backend:** Laravel (PHP) con lógica de negocio personalizada.
*   **Base de Datos:** PostgreSQL para el almacenamiento persistente de datos críticos.
*   **Metodología:** Desarrollo bajo el marco de trabajo **Agile SCRUM**.

---

## 📁 Estructura del Repositorio
El repositorio está dividido en dos microservicios principales:

*   **/frontend:** Aplicación SPA (Single Page Application) desarrollada en React.
*   **/backend:** API robusta desarrollada en Laravel que gestiona la autenticación, reportes y lógica de contingencias.

---

## ⚙️ Instalación y Configuración

### Requisitos Previos
*   PHP >= 8.2
*   Node.js & npm
*   Composer
*   PostgreSQL

### Configuración del Backend
1. Entrar a la carpeta: cd backend
2. Instalar dependencias: composer install
3. Configurar el archivo .env con las credenciales de tu base de datos.
4. Generar la clave de aplicación: php artisan key:generate
5. Ejecutar migraciones: php artisan migrate
6. **Importante:** Crear el enlace simbólico para la gestión de archivos ejecutando: php artisan storage:link
7. Iniciar servidor: php artisan serve

### Configuración del Frontend
1. Entrar a la carpeta: cd frontend
2. Instalar dependencias: npm install
3. Iniciar aplicación: npm run dev

---

## 🛡️ Características Principales
*   **Gestión de Usuarios:** Roles definidos para operadores y administradores.
*   **Recuperación de Contraseña:** Flujo seguro mediante códigos temporales enviados por correo (SMTP).
*   **Módulo de Reportes:** Generación de archivos PDF utilizando jsPDF.
*   **Repositorio de Documentos:** Gestión de archivos técnicos mediante el sistema de almacenamiento de Laravel.
*   **Trazabilidad:** Registro detallado de eventos en las sedes de Caracas, Camatagua y Baemari.

## 👥 Autores
Este proyecto es resultado del trabajo de los estudiantes del **Tercer Trayecto de Ingeniería en Informática**:
*   **Diana Sierra**
*   **Ana Contreras**
*   **Darwin Colmenares**

---
*Bajo la tutoría del Ing. Rodolfo Pacheco / Gerencia de Operaciones Satelitales de CANTV.*