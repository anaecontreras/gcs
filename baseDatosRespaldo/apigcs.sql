/*
 Navicat Premium Dump SQL

 Source Server         : PostgreSQL
 Source Server Type    : PostgreSQL
 Source Server Version : 160010 (160010)
 Source Host           : localhost:5432
 Source Catalog        : apigcs
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160010 (160010)
 File Encoding         : 65001

 Date: 01/02/2026 23:39:44
*/


-- ----------------------------
-- Sequence structure for blogs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."blogs_id_seq";
CREATE SEQUENCE "public"."blogs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for calendarios_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."calendarios_id_seq";
CREATE SEQUENCE "public"."calendarios_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for categoriadocs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."categoriadocs_id_seq";
CREATE SEQUENCE "public"."categoriadocs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for comentariosforos_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."comentariosforos_id_seq";
CREATE SEQUENCE "public"."comentariosforos_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for documentos_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."documentos_id_seq";
CREATE SEQUENCE "public"."documentos_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for failed_jobs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."failed_jobs_id_seq";
CREATE SEQUENCE "public"."failed_jobs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for jobs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."jobs_id_seq";
CREATE SEQUENCE "public"."jobs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for logs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."logs_id_seq";
CREATE SEQUENCE "public"."logs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for migrations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."migrations_id_seq";
CREATE SEQUENCE "public"."migrations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for personal_access_tokens_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."personal_access_tokens_id_seq";
CREATE SEQUENCE "public"."personal_access_tokens_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for rol_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."rol_id_seq";
CREATE SEQUENCE "public"."rol_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for temasforos_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."temasforos_id_seq";
CREATE SEQUENCE "public"."temasforos_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS "public"."blogs";
CREATE TABLE "public"."blogs" (
  "id" int8 NOT NULL DEFAULT nextval('blogs_id_seq'::regclass),
  "usuario_reporte_id" int8 NOT NULL,
  "titulo" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "prioridad" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "estado" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO "public"."blogs" VALUES (4, 1, 'Registro de Prueba', 'Baja', 'En Progreso', '2026-01-31 12:53:52', '2026-01-31 12:53:52');
INSERT INTO "public"."blogs" VALUES (5, 1, 'Otro Registro de Prueba', 'Media', 'Cerrado', '2026-01-31 12:54:11', '2026-01-31 12:54:11');
INSERT INTO "public"."blogs" VALUES (6, 1, 'Quinto Elemento Registro de Prueba', 'Alta', 'Cerrado', '2026-01-31 12:57:07', '2026-01-31 12:57:07');
INSERT INTO "public"."blogs" VALUES (7, 1, 'Carga de Prueba del usuario seis', 'Media', 'Cerrado', '2026-01-31 13:13:46', '2026-01-31 13:13:46');
INSERT INTO "public"."blogs" VALUES (8, 1, 'Carga de Prueba del usuario seis, contando algo mas que nada, para probar el tamaño real', 'Media', 'Cerrado', '2026-01-31 13:15:43', '2026-01-31 13:15:43');
INSERT INTO "public"."blogs" VALUES (9, 5, 'Carga de Prueba del usuario seis, contando algo mas que nada, para probar el tamaño real', 'Media', 'Cerrado', '2026-01-31 13:35:04', '2026-01-31 13:35:04');
INSERT INTO "public"."blogs" VALUES (14, 1, 'Batman Vs Superman', 'Alta', 'Cerrado', '2026-01-31 16:55:28', '2026-01-31 16:55:28');
INSERT INTO "public"."blogs" VALUES (2, 1, 'Falla Marvel', 'Alta', 'Cerrado', '2026-01-17 18:14:06', '2026-01-31 17:55:31');
INSERT INTO "public"."blogs" VALUES (12, 1, 'Quinto Elemento', 'Alta', 'Cerrado', '2026-01-31 16:42:38', '2026-01-31 17:59:53');
INSERT INTO "public"."blogs" VALUES (17, 22, 'Tripin de pollin revolution', 'Baja', 'Cerrado', '2026-01-31 22:14:48', '2026-02-01 15:49:58');
INSERT INTO "public"."blogs" VALUES (3, 1, 'Falla de Internet ABA', 'Media', 'Cerrado', '2026-01-17 18:18:16', '2026-02-01 15:58:03');
INSERT INTO "public"."blogs" VALUES (15, 1, 'Capitan America - The Winter Soldier', 'Alta', 'Cerrado', '2026-01-31 16:55:50', '2026-02-01 17:20:07');
INSERT INTO "public"."blogs" VALUES (18, 5, 'Probando', 'Media', 'En Progreso', '2026-02-01 19:36:21', '2026-02-01 19:36:21');
INSERT INTO "public"."blogs" VALUES (19, 26, 'Otro de prueba de quarzo', 'Alta', 'En Progreso', '2026-02-01 19:37:11', '2026-02-01 19:37:11');
INSERT INTO "public"."blogs" VALUES (20, 26, 'OTRO DE CUARZO', 'Media', 'En Progreso', '2026-02-01 19:38:43', '2026-02-01 19:38:43');
INSERT INTO "public"."blogs" VALUES (10, 5, 'Carga de Prueba del usuario seis, contando algo mas que nada, para probar el tamaño real, con un texto cada vez más alto, para ver como se organiza la tabla', 'Alta', 'Cerrado', '2026-01-31 13:43:31', '2026-02-01 19:46:08');
INSERT INTO "public"."blogs" VALUES (21, 34, 'Falla de Comida', 'Alta', 'En Progreso', '2026-02-01 23:22:49', '2026-02-01 23:22:49');

-- ----------------------------
-- Table structure for cache
-- ----------------------------
DROP TABLE IF EXISTS "public"."cache";
CREATE TABLE "public"."cache" (
  "key" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "value" text COLLATE "pg_catalog"."default" NOT NULL,
  "expiration" int4 NOT NULL
)
;

-- ----------------------------
-- Records of cache
-- ----------------------------

-- ----------------------------
-- Table structure for cache_locks
-- ----------------------------
DROP TABLE IF EXISTS "public"."cache_locks";
CREATE TABLE "public"."cache_locks" (
  "key" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "owner" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "expiration" int4 NOT NULL
)
;

-- ----------------------------
-- Records of cache_locks
-- ----------------------------

-- ----------------------------
-- Table structure for calendarios
-- ----------------------------
DROP TABLE IF EXISTS "public"."calendarios";
CREATE TABLE "public"."calendarios" (
  "id" int8 NOT NULL DEFAULT nextval('calendarios_id_seq'::regclass),
  "usuario_creador_id" int8 NOT NULL,
  "titulo" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "fecha_inicio" timestamp(0),
  "fecha_fin" timestamp(0),
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of calendarios
-- ----------------------------
INSERT INTO "public"."calendarios" VALUES (2, 1, 'Fiesta Celebracion', '2026-05-03 08:00:00', '2026-05-03 12:00:00', '2026-01-17 18:34:50', '2026-01-17 18:34:50');
INSERT INTO "public"."calendarios" VALUES (4, 22, 'Fiesta Carnaval', '2026-02-02 08:00:00', '2026-03-02 12:00:00', '2026-01-31 19:00:36', '2026-01-31 19:00:36');
INSERT INTO "public"."calendarios" VALUES (5, 22, 'Celebración por quien sabe que', '2026-02-02 08:00:00', '2026-03-02 12:00:00', '2026-01-31 19:00:52', '2026-01-31 19:00:52');
INSERT INTO "public"."calendarios" VALUES (9, 22, 'Cumpleaños de Coco en Artigas', '2026-02-04 14:30:00', '2026-02-04 22:00:00', '2026-01-31 22:23:27', '2026-01-31 22:23:55');
INSERT INTO "public"."calendarios" VALUES (3, 22, 'Fiesta Navideña', '2026-01-20 08:00:00', '2026-01-22 12:00:00', '2026-01-31 19:00:13', '2026-02-01 15:04:32');
INSERT INTO "public"."calendarios" VALUES (12, 22, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX', '2026-02-03 10:00:00', '2026-02-03 16:00:00', '2026-02-01 15:29:42', '2026-02-01 15:29:42');
INSERT INTO "public"."calendarios" VALUES (13, 22, 'PROBANDO EN CURSO', '2026-02-01 18:24:00', '2026-02-01 22:23:00', '2026-02-01 17:24:01', '2026-02-01 17:24:01');

-- ----------------------------
-- Table structure for categoriadocs
-- ----------------------------
DROP TABLE IF EXISTS "public"."categoriadocs";
CREATE TABLE "public"."categoriadocs" (
  "id" int8 NOT NULL DEFAULT nextval('categoriadocs_id_seq'::regclass),
  "nombre_categoria" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of categoriadocs
-- ----------------------------
INSERT INTO "public"."categoriadocs" VALUES (1, 'Procedimiento', NULL, '2026-01-17 11:45:27');
INSERT INTO "public"."categoriadocs" VALUES (2, 'Manual', '2026-01-17 11:29:14', '2026-01-17 11:45:40');
INSERT INTO "public"."categoriadocs" VALUES (3, 'Diagrama', '2026-01-17 11:37:20', '2026-01-17 11:46:03');

-- ----------------------------
-- Table structure for comentariosforos
-- ----------------------------
DROP TABLE IF EXISTS "public"."comentariosforos";
CREATE TABLE "public"."comentariosforos" (
  "id" int8 NOT NULL DEFAULT nextval('comentariosforos_id_seq'::regclass),
  "tema_id" int8 NOT NULL,
  "usuario_creador_id" int8 NOT NULL,
  "cuerpo" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of comentariosforos
-- ----------------------------
INSERT INTO "public"."comentariosforos" VALUES (1, 2, 1, 'Cuerpo del comentario actualizado.', '2026-01-18 22:11:29', '2026-01-18 22:12:40');
INSERT INTO "public"."comentariosforos" VALUES (4, 3, 22, 'Hulk (salió ese mismo año)', '2026-01-31 21:20:00', '2026-01-31 21:20:00');
INSERT INTO "public"."comentariosforos" VALUES (5, 3, 22, 'Vengadores I (fue la mejor, lograron algo increible', '2026-01-31 21:20:28', '2026-01-31 21:20:28');
INSERT INTO "public"."comentariosforos" VALUES (7, 6, 22, 'Los Increibles, lo mejor', '2026-02-01 00:01:50', '2026-02-01 00:01:50');
INSERT INTO "public"."comentariosforos" VALUES (9, 5, 22, 'Me gusta El Conjuro 1, 2 y 3', '2026-02-01 00:05:50', '2026-02-01 00:07:11');
INSERT INTO "public"."comentariosforos" VALUES (3, 3, 22, 'Iron Man I (la mejor, la número 1, el inicio)', '2026-01-31 21:19:28', '2026-02-01 00:16:47');
INSERT INTO "public"."comentariosforos" VALUES (11, 3, 22, 'Probando', '2026-02-01 14:58:04', '2026-02-01 14:58:04');
INSERT INTO "public"."comentariosforos" VALUES (12, 4, 22, 'Probando', '2026-02-01 17:20:43', '2026-02-01 17:20:43');
INSERT INTO "public"."comentariosforos" VALUES (13, 4, 22, 'Arriba', '2026-02-01 17:20:55', '2026-02-01 17:20:55');
INSERT INTO "public"."comentariosforos" VALUES (15, 6, 5, 'Comentario de seis', '2026-02-01 20:01:40', '2026-02-01 20:01:40');
INSERT INTO "public"."comentariosforos" VALUES (16, 12, 5, 'Comentario de ella misma', '2026-02-01 20:01:53', '2026-02-01 20:01:53');
INSERT INTO "public"."comentariosforos" VALUES (17, 12, 26, 'Comentario a tema de seis de parte de quarzo', '2026-02-01 20:03:01', '2026-02-01 20:03:01');

-- ----------------------------
-- Table structure for documentos
-- ----------------------------
DROP TABLE IF EXISTS "public"."documentos";
CREATE TABLE "public"."documentos" (
  "id" int8 NOT NULL DEFAULT nextval('documentos_id_seq'::regclass),
  "categoria_id" int8 NOT NULL,
  "usuario_creador_id" int8 NOT NULL,
  "titulo" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "ruta_archivo" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "version" varchar(10) COLLATE "pg_catalog"."default" NOT NULL,
  "fecha_publicacion" date NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of documentos
-- ----------------------------
INSERT INTO "public"."documentos" VALUES (6, 1, 1, 'Gúia de Bash223', 'documentos/vvmIM6KRdpibxyS7Obr8vF322Zb74R6F99Wrj33K.pdf', '1.0.1.3', '2026-01-21', '2026-01-17 17:15:50', '2026-01-21 22:28:52');
INSERT INTO "public"."documentos" VALUES (14, 2, 22, 'Operación Trueno', 'documentos/UZOMxfm3uXahrc3wJ6ReZXPr81kzkHnVj7RfKWrU.pdf', '1.0', '2026-01-31', '2026-01-31 20:17:44', '2026-01-31 20:17:44');
INSERT INTO "public"."documentos" VALUES (16, 2, 22, 'Desde Rusia con Amor', 'documentos/L6hTiEJJw8QpqaSxI17V4pXMNFvE4T17Pgl0WzW4.pdf', '2.0', '2026-01-02', '2026-01-31 20:30:53', '2026-01-31 20:30:53');
INSERT INTO "public"."documentos" VALUES (19, 2, 22, 'Nintendo Wii Chipeo Ajaaa', 'documentos/bLTFPnV4UFkgStVyHiiT3LRsWTlrpFVaiExocghS.pdf', '0.2.1', '2026-01-29', '2026-01-31 20:32:53', '2026-01-31 20:41:45');
INSERT INTO "public"."documentos" VALUES (13, 1, 22, 'Libro James Bond - Casino Royal', 'documentos/2JrxKOVJbLs9VIZn17mt7DAY5DwQv3tXpK8b3n1b.pdf', '1.0', '2026-01-31', '2026-01-31 20:06:41', '2026-01-31 22:21:01');
INSERT INTO "public"."documentos" VALUES (20, 2, 22, 'Caso de Estudio', 'documentos/GmhdPMtXrKzud6FOGwmz0joHXhXNCgDbjfXaFsOa.pdf', '1.2', '2026-01-16', '2026-01-31 22:21:48', '2026-01-31 22:21:48');
INSERT INTO "public"."documentos" VALUES (18, 2, 22, 'Atajos de teclado VSCODE Windows New', 'documentos/MBQQ4NhcDEOWvxBOBNrEboKdM0GXHhgzN5xM88Y0.pdf', '3.0', '2026-01-31', '2026-01-31 20:32:02', '2026-02-01 16:14:12');
INSERT INTO "public"."documentos" VALUES (21, 2, 22, 'El espia que me amo', 'documentos/T3vkOoKC5Xh1TrWWqHCwX5HsBdpWEHUWFL5Ty8Ur.pdf', '1.1', '2026-02-03', '2026-02-01 16:14:47', '2026-02-01 16:14:47');

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS "public"."failed_jobs";
CREATE TABLE "public"."failed_jobs" (
  "id" int8 NOT NULL DEFAULT nextval('failed_jobs_id_seq'::regclass),
  "uuid" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "connection" text COLLATE "pg_catalog"."default" NOT NULL,
  "queue" text COLLATE "pg_catalog"."default" NOT NULL,
  "payload" text COLLATE "pg_catalog"."default" NOT NULL,
  "exception" text COLLATE "pg_catalog"."default" NOT NULL,
  "failed_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for job_batches
-- ----------------------------
DROP TABLE IF EXISTS "public"."job_batches";
CREATE TABLE "public"."job_batches" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "total_jobs" int4 NOT NULL,
  "pending_jobs" int4 NOT NULL,
  "failed_jobs" int4 NOT NULL,
  "failed_job_ids" text COLLATE "pg_catalog"."default" NOT NULL,
  "options" text COLLATE "pg_catalog"."default",
  "cancelled_at" int4,
  "created_at" int4 NOT NULL,
  "finished_at" int4
)
;

-- ----------------------------
-- Records of job_batches
-- ----------------------------

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS "public"."jobs";
CREATE TABLE "public"."jobs" (
  "id" int8 NOT NULL DEFAULT nextval('jobs_id_seq'::regclass),
  "queue" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "payload" text COLLATE "pg_catalog"."default" NOT NULL,
  "attempts" int2 NOT NULL,
  "reserved_at" int4,
  "available_at" int4 NOT NULL,
  "created_at" int4 NOT NULL
)
;

-- ----------------------------
-- Records of jobs
-- ----------------------------

-- ----------------------------
-- Table structure for logs
-- ----------------------------
DROP TABLE IF EXISTS "public"."logs";
CREATE TABLE "public"."logs" (
  "id" int8 NOT NULL DEFAULT nextval('logs_id_seq'::regclass),
  "usuario_correo" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "accion" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "entidad_afectada" varchar(50) COLLATE "pg_catalog"."default",
  "entidad_id" int4,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of logs
-- ----------------------------
INSERT INTO "public"."logs" VALUES (371, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-01-31 14:31:37', '2026-01-31 14:31:37');
INSERT INTO "public"."logs" VALUES (372, 'admin@gmail.com', 'Logout', 'users', 1, '2026-01-31 14:31:59', '2026-01-31 14:31:59');
INSERT INTO "public"."logs" VALUES (373, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-01-31 16:37:58', '2026-01-31 16:37:58');
INSERT INTO "public"."logs" VALUES (374, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-01-31 16:41:54', '2026-01-31 16:41:54');
INSERT INTO "public"."logs" VALUES (375, 'admin@gmail.com', 'Registro de Blog: xzxsak jcjdfj ksldjsjd lkjdksajkl lsadj lksjslkdjsakl sakldjsaklj', 'blogs', 12, '2026-01-31 16:42:38', '2026-01-31 16:42:38');
INSERT INTO "public"."logs" VALUES (376, 'admin@gmail.com', 'Registro de Blog: Lilo & Stick', 'blogs', 13, '2026-01-31 16:51:03', '2026-01-31 16:51:03');
INSERT INTO "public"."logs" VALUES (377, 'admin@gmail.com', 'Registro de Blog: Batman Vs Superman', 'blogs', 14, '2026-01-31 16:55:28', '2026-01-31 16:55:28');
INSERT INTO "public"."logs" VALUES (378, 'admin@gmail.com', 'Registro de Blog: Capitan America', 'blogs', 15, '2026-01-31 16:55:50', '2026-01-31 16:55:50');
INSERT INTO "public"."logs" VALUES (379, 'admin@gmail.com', 'Logout', 'users', 1, '2026-01-31 16:56:18', '2026-01-31 16:56:18');
INSERT INTO "public"."logs" VALUES (380, 'quarzo@gmail.com', 'Login exitoso', 'users', 26, '2026-01-31 16:56:37', '2026-01-31 16:56:37');
INSERT INTO "public"."logs" VALUES (381, 'quarzo@gmail.com', 'Registro de Blog: Tele Tubies', 'blogs', 16, '2026-01-31 16:57:04', '2026-01-31 16:57:04');
INSERT INTO "public"."logs" VALUES (382, 'admin@gmail.com', 'Edición de Blog: ID 2 - Falla Marvel', 'blogs', 2, '2026-01-31 17:55:31', '2026-01-31 17:55:31');
INSERT INTO "public"."logs" VALUES (383, 'quarzo@gmail.com', 'Edición de Blog: ID 16 - Tele Tubies', 'blogs', 16, '2026-01-31 17:59:23', '2026-01-31 17:59:23');
INSERT INTO "public"."logs" VALUES (384, 'quarzo@gmail.com', 'Edición de Blog: ID 16 - Tele Tubies 2', 'blogs', 16, '2026-01-31 17:59:30', '2026-01-31 17:59:30');
INSERT INTO "public"."logs" VALUES (385, 'quarzo@gmail.com', 'Edición de Blog: ID 12 - Quinto Elemento', 'blogs', 12, '2026-01-31 17:59:53', '2026-01-31 17:59:53');
INSERT INTO "public"."logs" VALUES (386, 'admin@gmail.com', 'Eliminación de Blog: Lilo & Stick', 'blogs', 13, '2026-01-31 18:01:13', '2026-01-31 18:01:13');
INSERT INTO "public"."logs" VALUES (387, 'quarzo@gmail.com', 'Eliminación de Blog: Tele Tubies 2', 'blogs', 16, '2026-01-31 18:04:18', '2026-01-31 18:04:18');
INSERT INTO "public"."logs" VALUES (388, 'quarzo@gmail.com', 'Eliminación de Blog: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer too', 'blogs', 11, '2026-01-31 18:04:29', '2026-01-31 18:04:29');
INSERT INTO "public"."logs" VALUES (389, 'admin@gmail.com', 'Cambio su contraseña', 'users', 1, '2026-01-31 18:08:00', '2026-01-31 18:08:00');
INSERT INTO "public"."logs" VALUES (390, 'quarzo@gmail.com', 'Logout', 'users', 26, '2026-01-31 18:12:46', '2026-01-31 18:12:46');
INSERT INTO "public"."logs" VALUES (391, 'admin@gmail.com', 'Login fallido: contraseña incorrecta', 'users', 1, '2026-01-31 18:12:59', '2026-01-31 18:12:59');
INSERT INTO "public"."logs" VALUES (392, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-01-31 18:13:05', '2026-01-31 18:13:05');
INSERT INTO "public"."logs" VALUES (393, 'admin@gmail.com', 'Logout', 'users', 1, '2026-01-31 18:23:44', '2026-01-31 18:23:44');
INSERT INTO "public"."logs" VALUES (394, 'admin@gmail.com', 'Login fallido: contraseña incorrecta', 'users', 1, '2026-01-31 18:23:55', '2026-01-31 18:23:55');
INSERT INTO "public"."logs" VALUES (395, 'admin@gmail.com', 'Login fallido: contraseña incorrecta', 'users', 1, '2026-01-31 18:24:04', '2026-01-31 18:24:04');
INSERT INTO "public"."logs" VALUES (396, 'admin@gmail.com', 'Login fallido: contraseña incorrecta', 'users', 1, '2026-01-31 18:24:09', '2026-01-31 18:24:09');
INSERT INTO "public"."logs" VALUES (397, 'admin@gmail.com', 'Login fallido: contraseña incorrecta', 'users', 1, '2026-01-31 18:24:18', '2026-01-31 18:24:18');
INSERT INTO "public"."logs" VALUES (398, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-01-31 18:25:00', '2026-01-31 18:25:00');
INSERT INTO "public"."logs" VALUES (399, 'superman@gmail.com', 'Logout', 'users', 22, '2026-01-31 18:25:25', '2026-01-31 18:25:25');
INSERT INTO "public"."logs" VALUES (400, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-01-31 18:25:36', '2026-01-31 18:25:36');
INSERT INTO "public"."logs" VALUES (401, 'superman@gmail.com', 'Logout', 'users', 22, '2026-01-31 18:31:47', '2026-01-31 18:31:47');
INSERT INTO "public"."logs" VALUES (402, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-01-31 18:31:59', '2026-01-31 18:31:59');
INSERT INTO "public"."logs" VALUES (403, 'superman@gmail.com', 'Cambio su contraseña', 'users', 22, '2026-01-31 18:35:00', '2026-01-31 18:35:00');
INSERT INTO "public"."logs" VALUES (404, 'superman@gmail.com', 'Logout', 'users', 22, '2026-01-31 18:35:05', '2026-01-31 18:35:05');
INSERT INTO "public"."logs" VALUES (405, 'superman@gmail.com', 'Login fallido: contraseña incorrecta', 'users', 22, '2026-01-31 18:35:20', '2026-01-31 18:35:20');
INSERT INTO "public"."logs" VALUES (406, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-01-31 18:35:27', '2026-01-31 18:35:27');
INSERT INTO "public"."logs" VALUES (407, 'superman@gmail.com', 'Edición de Blog: ID 15 - Capitan America - The Winter Soldier', 'blogs', 15, '2026-01-31 18:35:45', '2026-01-31 18:35:45');
INSERT INTO "public"."logs" VALUES (408, 'superman@gmail.com', 'Login fallido: contraseña incorrecta', 'users', 22, '2026-01-31 18:39:21', '2026-01-31 18:39:21');
INSERT INTO "public"."logs" VALUES (409, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-01-31 18:39:26', '2026-01-31 18:39:26');
INSERT INTO "public"."logs" VALUES (410, 'superman@gmail.com', 'Cambio su contraseña', 'users', 22, '2026-01-31 18:39:43', '2026-01-31 18:39:43');
INSERT INTO "public"."logs" VALUES (411, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-01-31 18:44:28', '2026-01-31 18:44:28');
INSERT INTO "public"."logs" VALUES (412, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-01-31 18:50:29', '2026-01-31 18:50:29');
INSERT INTO "public"."logs" VALUES (413, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-01-31 18:55:57', '2026-01-31 18:55:57');
INSERT INTO "public"."logs" VALUES (414, 'superman@gmail.com', 'Registro en calendario: Fiesta Navideña', 'calendarios', 3, '2026-01-31 19:00:13', '2026-01-31 19:00:13');
INSERT INTO "public"."logs" VALUES (415, 'superman@gmail.com', 'Registro en calendario: Fiesta Carnaval', 'calendarios', 4, '2026-01-31 19:00:36', '2026-01-31 19:00:36');
INSERT INTO "public"."logs" VALUES (416, 'superman@gmail.com', 'Registro en calendario: Celebración por quien sabe que', 'calendarios', 5, '2026-01-31 19:00:52', '2026-01-31 19:00:52');
INSERT INTO "public"."logs" VALUES (417, 'superman@gmail.com', 'Registro en calendario: La Fiesta de Chucky', 'calendarios', 6, '2026-01-31 19:10:28', '2026-01-31 19:10:28');
INSERT INTO "public"."logs" VALUES (418, 'superman@gmail.com', 'Registro en calendario: Nueva Fiesta Hoy', 'calendarios', 7, '2026-01-31 19:11:41', '2026-01-31 19:11:41');
INSERT INTO "public"."logs" VALUES (419, 'superman@gmail.com', 'Edición en calendario: ID 7', 'calendarios', 7, '2026-01-31 19:14:03', '2026-01-31 19:14:03');
INSERT INTO "public"."logs" VALUES (420, 'superman@gmail.com', 'Registro en calendario: Fiesta en Colombia', 'calendarios', 8, '2026-01-31 19:16:37', '2026-01-31 19:16:37');
INSERT INTO "public"."logs" VALUES (421, 'superman@gmail.com', 'Edición en calendario: ID 8', 'calendarios', 8, '2026-01-31 19:16:57', '2026-01-31 19:16:57');
INSERT INTO "public"."logs" VALUES (422, 'superman@gmail.com', 'Eliminación en calendario: Fiesta en Colombia Cucuta', 'calendarios', 8, '2026-01-31 19:18:08', '2026-01-31 19:18:08');
INSERT INTO "public"."logs" VALUES (423, 'superman@gmail.com', 'Eliminación en calendario: Nueva Fiesta Bonche Hoy', 'calendarios', 7, '2026-01-31 19:19:56', '2026-01-31 19:19:56');
INSERT INTO "public"."logs" VALUES (424, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-01-31 19:42:22', '2026-01-31 19:42:22');
INSERT INTO "public"."logs" VALUES (425, 'superman@gmail.com', 'Creado documento: Libro James Bond', 'documento', 13, '2026-01-31 20:06:41', '2026-01-31 20:06:41');
INSERT INTO "public"."logs" VALUES (426, 'superman@gmail.com', 'Creado documento: Operación Trueno', 'documento', 14, '2026-01-31 20:17:44', '2026-01-31 20:17:44');
INSERT INTO "public"."logs" VALUES (427, 'superman@gmail.com', 'Creado documento: Octopussy', 'documento', 15, '2026-01-31 20:18:39', '2026-01-31 20:18:39');
INSERT INTO "public"."logs" VALUES (428, 'superman@gmail.com', 'Eliminado documento y archivo físico: Octopussy', 'documento', 15, '2026-01-31 20:23:56', '2026-01-31 20:23:56');
INSERT INTO "public"."logs" VALUES (429, 'superman@gmail.com', 'Eliminado documento y archivo físico: probando viejo', 'documento', 12, '2026-01-31 20:29:45', '2026-01-31 20:29:45');
INSERT INTO "public"."logs" VALUES (430, 'superman@gmail.com', 'Eliminado documento y archivo físico: Nuevo 1', 'documento', 10, '2026-01-31 20:30:12', '2026-01-31 20:30:12');
INSERT INTO "public"."logs" VALUES (431, 'superman@gmail.com', 'Eliminado documento y archivo físico: Nuevo Alfa', 'documento', 11, '2026-01-31 20:30:20', '2026-01-31 20:30:20');
INSERT INTO "public"."logs" VALUES (432, 'superman@gmail.com', 'Creado documento: Desde Rusia con Amor', 'documento', 16, '2026-01-31 20:30:53', '2026-01-31 20:30:53');
INSERT INTO "public"."logs" VALUES (433, 'superman@gmail.com', 'Creado documento: Atajos de teclado VSCODE Linux', 'documento', 17, '2026-01-31 20:31:31', '2026-01-31 20:31:31');
INSERT INTO "public"."logs" VALUES (434, 'superman@gmail.com', 'Creado documento: Atajos de teclado VSCODE Windows', 'documento', 18, '2026-01-31 20:32:02', '2026-01-31 20:32:02');
INSERT INTO "public"."logs" VALUES (435, 'superman@gmail.com', 'Creado documento: Nintendo Wii Chipeo', 'documento', 19, '2026-01-31 20:32:53', '2026-01-31 20:32:53');
INSERT INTO "public"."logs" VALUES (436, 'superman@gmail.com', 'Editado documento ID: 19. Se cambió archivo: NO', 'documento', 19, '2026-01-31 20:39:37', '2026-01-31 20:39:37');
INSERT INTO "public"."logs" VALUES (437, 'superman@gmail.com', 'Editado documento ID: 19. Se cambió archivo: NO', 'documento', 19, '2026-01-31 20:40:21', '2026-01-31 20:40:21');
INSERT INTO "public"."logs" VALUES (438, 'superman@gmail.com', 'Editado documento ID: 19. Se cambió archivo: SI', 'documento', 19, '2026-01-31 20:40:57', '2026-01-31 20:40:57');
INSERT INTO "public"."logs" VALUES (439, 'superman@gmail.com', 'Editado documento ID: 19. Se cambió archivo: SI', 'documento', 19, '2026-01-31 20:41:45', '2026-01-31 20:41:45');
INSERT INTO "public"."logs" VALUES (440, 'superman@gmail.com', 'Registro de Tema de Foro: Peliculas de Marvel, dinos la mejor', 'temasforos', 3, '2026-01-31 21:18:58', '2026-01-31 21:18:58');
INSERT INTO "public"."logs" VALUES (441, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 3', 'comentariosforos', 3, '2026-01-31 21:19:28', '2026-01-31 21:19:28');
INSERT INTO "public"."logs" VALUES (442, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 3', 'comentariosforos', 4, '2026-01-31 21:20:00', '2026-01-31 21:20:00');
INSERT INTO "public"."logs" VALUES (443, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 3', 'comentariosforos', 5, '2026-01-31 21:20:28', '2026-01-31 21:20:28');
INSERT INTO "public"."logs" VALUES (444, 'superman@gmail.com', 'Edición de Tema de Foro: ID 2', 'temasforos', 2, '2026-01-31 21:43:00', '2026-01-31 21:43:00');
INSERT INTO "public"."logs" VALUES (445, 'superman@gmail.com', 'Registro de Tema de Foro: Peliculas de DC, dinos la mejor', 'temasforos', 4, '2026-01-31 21:51:02', '2026-01-31 21:51:02');
INSERT INTO "public"."logs" VALUES (446, 'superman@gmail.com', 'Registro de Tema de Foro: Peliculas de Terror, dinos la mejor', 'temasforos', 5, '2026-01-31 21:51:37', '2026-01-31 21:51:37');
INSERT INTO "public"."logs" VALUES (447, 'superman@gmail.com', 'Registro de Blog: Tripin de pollin', 'blogs', 17, '2026-01-31 22:14:48', '2026-01-31 22:14:48');
INSERT INTO "public"."logs" VALUES (448, 'superman@gmail.com', 'Edición de Blog: ID 17 - Tripin de pollin 2', 'blogs', 17, '2026-01-31 22:15:13', '2026-01-31 22:15:13');
INSERT INTO "public"."logs" VALUES (449, 'superman@gmail.com', 'Editado documento ID: 13. Se cambió archivo: SI', 'documento', 13, '2026-01-31 22:19:05', '2026-01-31 22:19:05');
INSERT INTO "public"."logs" VALUES (450, 'superman@gmail.com', 'Editado documento ID: 13. Se cambió archivo: SI', 'documento', 13, '2026-01-31 22:21:01', '2026-01-31 22:21:01');
INSERT INTO "public"."logs" VALUES (451, 'superman@gmail.com', 'Eliminado documento y archivo físico: Atajos de teclado VSCODE Linux', 'documento', 17, '2026-01-31 22:21:18', '2026-01-31 22:21:18');
INSERT INTO "public"."logs" VALUES (452, 'superman@gmail.com', 'Creado documento: Caso de Estudio', 'documento', 20, '2026-01-31 22:21:48', '2026-01-31 22:21:48');
INSERT INTO "public"."logs" VALUES (453, 'superman@gmail.com', 'Eliminación en calendario: La Fiesta de Chucky', 'calendarios', 6, '2026-01-31 22:22:45', '2026-01-31 22:22:45');
INSERT INTO "public"."logs" VALUES (454, 'superman@gmail.com', 'Registro en calendario: Cumpleaños de Coco', 'calendarios', 9, '2026-01-31 22:23:27', '2026-01-31 22:23:27');
INSERT INTO "public"."logs" VALUES (455, 'superman@gmail.com', 'Edición en calendario: ID 9', 'calendarios', 9, '2026-01-31 22:23:55', '2026-01-31 22:23:55');
INSERT INTO "public"."logs" VALUES (456, 'superman@gmail.com', 'Registro de Tema de Foro: Peliculas de Dibujos Animados, dinos la mejor', 'temasforos', 6, '2026-01-31 23:33:16', '2026-01-31 23:33:16');
INSERT INTO "public"."logs" VALUES (457, 'superman@gmail.com', 'Registro de Tema de Foro: Novelas', 'temasforos', 7, '2026-01-31 23:39:02', '2026-01-31 23:39:02');
INSERT INTO "public"."logs" VALUES (458, 'superman@gmail.com', 'Registro de Tema de Foro: Uno para borrar', 'temasforos', 8, '2026-01-31 23:39:13', '2026-01-31 23:39:13');
INSERT INTO "public"."logs" VALUES (459, 'superman@gmail.com', 'Eliminación de Tema de Foro y sus comentarios: Uno para borrar', 'temasforos', 8, '2026-01-31 23:45:08', '2026-01-31 23:45:08');
INSERT INTO "public"."logs" VALUES (460, 'superman@gmail.com', 'Registro de Tema de Foro: Otro Para Borrar', 'temasforos', 9, '2026-01-31 23:45:57', '2026-01-31 23:45:57');
INSERT INTO "public"."logs" VALUES (461, 'superman@gmail.com', 'Eliminación de Tema de Foro y sus comentarios: Otro Para Borrar', 'temasforos', 9, '2026-01-31 23:48:20', '2026-01-31 23:48:20');
INSERT INTO "public"."logs" VALUES (462, 'superman@gmail.com', 'Edición de Tema de Foro: ID 7', 'temasforos', 7, '2026-01-31 23:51:07', '2026-01-31 23:51:07');
INSERT INTO "public"."logs" VALUES (463, 'superman@gmail.com', 'Edición de Tema de Foro: ID 7', 'temasforos', 7, '2026-01-31 23:54:29', '2026-01-31 23:54:29');
INSERT INTO "public"."logs" VALUES (464, 'superman@gmail.com', 'Eliminación de Tema de Foro y sus comentarios: Novelas Coreanas Chidas', 'temasforos', 7, '2026-01-31 23:54:38', '2026-01-31 23:54:38');
INSERT INTO "public"."logs" VALUES (465, 'superman@gmail.com', 'Registro de Tema de Foro: Novelas Coreanas', 'temasforos', 10, '2026-01-31 23:54:47', '2026-01-31 23:54:47');
INSERT INTO "public"."logs" VALUES (466, 'superman@gmail.com', 'Edición de Tema de Foro: ID 10', 'temasforos', 10, '2026-01-31 23:58:21', '2026-01-31 23:58:21');
INSERT INTO "public"."logs" VALUES (467, 'superman@gmail.com', 'Eliminación de Tema de Foro y sus comentarios: Novelas Coreanas', 'temasforos', 10, '2026-01-31 23:58:29', '2026-01-31 23:58:29');
INSERT INTO "public"."logs" VALUES (468, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 6', 'comentariosforos', 6, '2026-02-01 00:01:23', '2026-02-01 00:01:23');
INSERT INTO "public"."logs" VALUES (469, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 6', 'comentariosforos', 7, '2026-02-01 00:01:50', '2026-02-01 00:01:50');
INSERT INTO "public"."logs" VALUES (470, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 6', 'comentariosforos', 8, '2026-02-01 00:05:23', '2026-02-01 00:05:23');
INSERT INTO "public"."logs" VALUES (471, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 5', 'comentariosforos', 9, '2026-02-01 00:05:50', '2026-02-01 00:05:50');
INSERT INTO "public"."logs" VALUES (472, 'superman@gmail.com', 'Edición de Comentario ID: 9', 'comentariosforos', 9, '2026-02-01 00:07:11', '2026-02-01 00:07:11');
INSERT INTO "public"."logs" VALUES (473, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 6', 'comentariosforos', 10, '2026-02-01 00:11:52', '2026-02-01 00:11:52');
INSERT INTO "public"."logs" VALUES (474, 'superman@gmail.com', 'Edición de Comentario ID: 10', 'comentariosforos', 10, '2026-02-01 00:12:15', '2026-02-01 00:12:15');
INSERT INTO "public"."logs" VALUES (475, 'superman@gmail.com', 'Eliminación de Comentario ID: 10', 'comentariosforos', 10, '2026-02-01 00:13:42', '2026-02-01 00:13:42');
INSERT INTO "public"."logs" VALUES (476, 'superman@gmail.com', 'Eliminación de Comentario ID: 8', 'comentariosforos', 8, '2026-02-01 00:16:02', '2026-02-01 00:16:02');
INSERT INTO "public"."logs" VALUES (477, 'superman@gmail.com', 'Eliminación de Comentario ID: 6', 'comentariosforos', 6, '2026-02-01 00:16:17', '2026-02-01 00:16:17');
INSERT INTO "public"."logs" VALUES (478, 'superman@gmail.com', 'Edición de Comentario ID: 3', 'comentariosforos', 3, '2026-02-01 00:16:47', '2026-02-01 00:16:47');
INSERT INTO "public"."logs" VALUES (479, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 00:17:03', '2026-02-01 00:17:03');
INSERT INTO "public"."logs" VALUES (480, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 11:18:18', '2026-02-01 11:18:18');
INSERT INTO "public"."logs" VALUES (481, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 11:21:56', '2026-02-01 11:21:56');
INSERT INTO "public"."logs" VALUES (482, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 13:22:02', '2026-02-01 13:22:02');
INSERT INTO "public"."logs" VALUES (483, 'superman@gmail.com', 'Registro de usuario: prueba456@gmail.com, rol: 3', 'users', 28, '2026-02-01 13:22:21', '2026-02-01 13:22:21');
INSERT INTO "public"."logs" VALUES (484, 'superman@gmail.com', 'Registro de usuario: ironman@gmail.com, rol: 2', 'users', 29, '2026-02-01 14:19:25', '2026-02-01 14:19:25');
INSERT INTO "public"."logs" VALUES (485, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 14:20:01', '2026-02-01 14:20:01');
INSERT INTO "public"."logs" VALUES (486, 'ironman@gmail.com', 'Login exitoso', 'users', 29, '2026-02-01 14:20:12', '2026-02-01 14:20:12');
INSERT INTO "public"."logs" VALUES (487, 'ironman@gmail.com', 'Logout', 'users', 29, '2026-02-01 14:20:19', '2026-02-01 14:20:19');
INSERT INTO "public"."logs" VALUES (488, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 14:20:30', '2026-02-01 14:20:30');
INSERT INTO "public"."logs" VALUES (489, 'superman@gmail.com', 'Registro de usuario: pepeto@gmail.com, rol: 2', 'users', 30, '2026-02-01 14:23:09', '2026-02-01 14:23:09');
INSERT INTO "public"."logs" VALUES (490, 'superman@gmail.com', 'Registro de usuario: iceman@gmail.com, rol: 1', 'users', 31, '2026-02-01 14:29:21', '2026-02-01 14:29:21');
INSERT INTO "public"."logs" VALUES (491, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 3', 'comentariosforos', 11, '2026-02-01 14:58:04', '2026-02-01 14:58:04');
INSERT INTO "public"."logs" VALUES (492, 'superman@gmail.com', 'Edición en calendario: ID 3', 'calendarios', 3, '2026-02-01 15:04:32', '2026-02-01 15:04:32');
INSERT INTO "public"."logs" VALUES (493, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 15:11:30', '2026-02-01 15:11:30');
INSERT INTO "public"."logs" VALUES (494, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 15:11:42', '2026-02-01 15:11:42');
INSERT INTO "public"."logs" VALUES (495, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 15:22:46', '2026-02-01 15:22:46');
INSERT INTO "public"."logs" VALUES (496, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 15:23:55', '2026-02-01 15:23:55');
INSERT INTO "public"."logs" VALUES (497, 'superman@gmail.com', 'Registro en calendario: Prueba Máxima', 'calendarios', 10, '2026-02-01 15:26:14', '2026-02-01 15:26:14');
INSERT INTO "public"."logs" VALUES (498, 'superman@gmail.com', 'Registro en calendario: Prueba Máxima', 'calendarios', 11, '2026-02-01 15:27:19', '2026-02-01 15:27:19');
INSERT INTO "public"."logs" VALUES (499, 'superman@gmail.com', 'Eliminación en calendario: Prueba Máxima', 'calendarios', 11, '2026-02-01 15:28:42', '2026-02-01 15:28:42');
INSERT INTO "public"."logs" VALUES (500, 'superman@gmail.com', 'Eliminación en calendario: Prueba Máxima', 'calendarios', 10, '2026-02-01 15:28:49', '2026-02-01 15:28:49');
INSERT INTO "public"."logs" VALUES (501, 'superman@gmail.com', 'Registro en calendario: XXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'calendarios', 12, '2026-02-01 15:29:42', '2026-02-01 15:29:42');
INSERT INTO "public"."logs" VALUES (502, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 15:48:56', '2026-02-01 15:48:56');
INSERT INTO "public"."logs" VALUES (503, 'superman@gmail.com', 'Edición de Blog: ID 17 - Tripin de pollin revolution', 'blogs', 17, '2026-02-01 15:49:58', '2026-02-01 15:49:58');
INSERT INTO "public"."logs" VALUES (504, 'superman@gmail.com', 'Edición de Blog: ID 3 - Falla de Internet ABA', 'blogs', 3, '2026-02-01 15:53:01', '2026-02-01 15:53:01');
INSERT INTO "public"."logs" VALUES (505, 'superman@gmail.com', 'Edición de Blog: ID 3 - Falla de Internet ABA', 'blogs', 3, '2026-02-01 15:58:03', '2026-02-01 15:58:03');
INSERT INTO "public"."logs" VALUES (506, 'superman@gmail.com', 'Editado documento ID: 18. Se cambió archivo: NO', 'documento', 18, '2026-02-01 16:14:12', '2026-02-01 16:14:12');
INSERT INTO "public"."logs" VALUES (507, 'superman@gmail.com', 'Creado documento: El espia que me amo', 'documento', 21, '2026-02-01 16:14:47', '2026-02-01 16:14:47');
INSERT INTO "public"."logs" VALUES (508, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 16:19:52', '2026-02-01 16:19:52');
INSERT INTO "public"."logs" VALUES (509, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 16:23:50', '2026-02-01 16:23:50');
INSERT INTO "public"."logs" VALUES (510, 'superman@gmail.com', 'Edición de Blog: ID 15 - Capitan America - The Winter Soldier', 'blogs', 15, '2026-02-01 17:20:07', '2026-02-01 17:20:07');
INSERT INTO "public"."logs" VALUES (511, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 4', 'comentariosforos', 12, '2026-02-01 17:20:43', '2026-02-01 17:20:43');
INSERT INTO "public"."logs" VALUES (512, 'superman@gmail.com', 'Registro de Comentario en Tema ID: 4', 'comentariosforos', 13, '2026-02-01 17:20:55', '2026-02-01 17:20:55');
INSERT INTO "public"."logs" VALUES (513, 'superman@gmail.com', 'Edición de Tema de Foro: ID 4', 'temasforos', 4, '2026-02-01 17:22:06', '2026-02-01 17:22:06');
INSERT INTO "public"."logs" VALUES (514, 'superman@gmail.com', 'Registro en calendario: PROBANDO EN CURSO', 'calendarios', 13, '2026-02-01 17:24:01', '2026-02-01 17:24:01');
INSERT INTO "public"."logs" VALUES (515, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 18:02:37', '2026-02-01 18:02:37');
INSERT INTO "public"."logs" VALUES (516, 'superman@gmail.com', 'Actualizó datos básicos del usuario tres@gmail.com. Cambios: name: Usuario tres → Usuario 3 modificado', 'users', 3, '2026-02-01 18:04:00', '2026-02-01 18:04:00');
INSERT INTO "public"."logs" VALUES (517, 'superman@gmail.com', 'Actualizó datos básicos del usuario admin@gmail.com. Cambios: name: Adminis Becerra → Adminis Becerra 2', 'users', 1, '2026-02-01 18:08:50', '2026-02-01 18:08:50');
INSERT INTO "public"."logs" VALUES (518, 'superman@gmail.com', 'Actualizó datos básicos del usuario admin@gmail.com. Cambios: ', 'users', 1, '2026-02-01 18:09:02', '2026-02-01 18:09:02');
INSERT INTO "public"."logs" VALUES (519, 'superman@gmail.com', 'Actualizó datos básicos del usuario admin@gmail.com. Cambios: rol_id: 1 → 2', 'users', 1, '2026-02-01 18:09:10', '2026-02-01 18:09:10');
INSERT INTO "public"."logs" VALUES (520, 'superman@gmail.com', 'Actualizó datos básicos del usuario admin@gmail.com. Cambios: rol_id: 2 → 1', 'users', 1, '2026-02-01 18:09:19', '2026-02-01 18:09:19');
INSERT INTO "public"."logs" VALUES (521, 'superman@gmail.com', 'Actualizó datos básicos del usuario tres@gmail.com. Cambios: ', 'users', 3, '2026-02-01 18:15:32', '2026-02-01 18:15:32');
INSERT INTO "public"."logs" VALUES (522, 'superman@gmail.com', 'Actualizó datos básicos del usuario admin@gmail.com. Cambios: name: Adminis Becerra 2 → Adminis Becerra 3', 'users', 1, '2026-02-01 18:28:45', '2026-02-01 18:28:45');
INSERT INTO "public"."logs" VALUES (523, 'superman@gmail.com', 'Actualizó datos básicos del usuario admin@gmail.com. Cambios: name: Adminis Becerra 3 → Adminis Becerra 4', 'users', 1, '2026-02-01 18:31:57', '2026-02-01 18:31:57');
INSERT INTO "public"."logs" VALUES (524, 'superman@gmail.com', 'Actualizó datos básicos del usuario admin@gmail.com. Cambios: name: Adminis Becerra 4 → Adminis Becerra 5', 'users', 1, '2026-02-01 18:35:27', '2026-02-01 18:35:27');
INSERT INTO "public"."logs" VALUES (525, 'superman@gmail.com', 'Actualizó datos básicos del usuario admin@gmail.com. Cambios: rol_id: 1 → 4', 'users', 1, '2026-02-01 18:43:34', '2026-02-01 18:43:34');
INSERT INTO "public"."logs" VALUES (526, 'superman@gmail.com', 'Deshabilitó al usuario quarzo@gmail.com', 'users', 26, '2026-02-01 18:51:43', '2026-02-01 18:51:43');
INSERT INTO "public"."logs" VALUES (527, 'superman@gmail.com', 'Habilitó al usuario quarzo@gmail.com', 'users', 26, '2026-02-01 18:51:46', '2026-02-01 18:51:46');
INSERT INTO "public"."logs" VALUES (528, 'superman@gmail.com', 'Deshabilitó al usuario quarzo@gmail.com', 'users', 26, '2026-02-01 18:51:48', '2026-02-01 18:51:48');
INSERT INTO "public"."logs" VALUES (529, 'superman@gmail.com', 'Habilitó al usuario quarzo@gmail.com', 'users', 26, '2026-02-01 18:53:09', '2026-02-01 18:53:09');
INSERT INTO "public"."logs" VALUES (530, 'superman@gmail.com', 'Deshabilitó al usuario admin@gmail.com', 'users', 1, '2026-02-01 18:55:50', '2026-02-01 18:55:50');
INSERT INTO "public"."logs" VALUES (531, 'superman@gmail.com', 'Habilitó al usuario admin@gmail.com', 'users', 1, '2026-02-01 18:55:56', '2026-02-01 18:55:56');
INSERT INTO "public"."logs" VALUES (532, 'superman@gmail.com', 'Habilitó al usuario aquaman@gmail.com', 'users', 23, '2026-02-01 18:56:01', '2026-02-01 18:56:01');
INSERT INTO "public"."logs" VALUES (533, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 19:01:22', '2026-02-01 19:01:22');
INSERT INTO "public"."logs" VALUES (534, 'pedro@gmail.com', 'Login exitoso', 'users', 27, '2026-02-01 19:01:31', '2026-02-01 19:01:31');
INSERT INTO "public"."logs" VALUES (535, 'pedro@gmail.com', 'Logout', 'users', 27, '2026-02-01 19:05:40', '2026-02-01 19:05:40');
INSERT INTO "public"."logs" VALUES (536, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 19:06:02', '2026-02-01 19:06:02');
INSERT INTO "public"."logs" VALUES (537, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 19:07:49', '2026-02-01 19:07:49');
INSERT INTO "public"."logs" VALUES (538, 'pedro@gmail.com', 'Login exitoso', 'users', 27, '2026-02-01 19:08:00', '2026-02-01 19:08:00');
INSERT INTO "public"."logs" VALUES (539, 'pedro@gmail.com', 'Logout', 'users', 27, '2026-02-01 19:09:44', '2026-02-01 19:09:44');
INSERT INTO "public"."logs" VALUES (540, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 19:09:54', '2026-02-01 19:09:54');
INSERT INTO "public"."logs" VALUES (541, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 19:11:55', '2026-02-01 19:11:55');
INSERT INTO "public"."logs" VALUES (542, 'pedro@gmail.com', 'Login exitoso', 'users', 27, '2026-02-01 19:12:06', '2026-02-01 19:12:06');
INSERT INTO "public"."logs" VALUES (543, 'pedro@gmail.com', 'Logout', 'users', 27, '2026-02-01 19:17:25', '2026-02-01 19:17:25');
INSERT INTO "public"."logs" VALUES (544, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 19:17:37', '2026-02-01 19:17:37');
INSERT INTO "public"."logs" VALUES (545, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 19:17:59', '2026-02-01 19:17:59');
INSERT INTO "public"."logs" VALUES (546, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 19:19:33', '2026-02-01 19:19:33');
INSERT INTO "public"."logs" VALUES (547, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 19:28:53', '2026-02-01 19:28:53');
INSERT INTO "public"."logs" VALUES (548, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 19:31:25', '2026-02-01 19:31:25');
INSERT INTO "public"."logs" VALUES (549, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 19:31:41', '2026-02-01 19:31:41');
INSERT INTO "public"."logs" VALUES (550, 'pedro@gmail.com', 'Login exitoso', 'users', 27, '2026-02-01 19:31:51', '2026-02-01 19:31:51');
INSERT INTO "public"."logs" VALUES (551, 'pedro@gmail.com', 'Logout', 'users', 27, '2026-02-01 19:32:01', '2026-02-01 19:32:01');
INSERT INTO "public"."logs" VALUES (552, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 19:32:15', '2026-02-01 19:32:15');
INSERT INTO "public"."logs" VALUES (553, 'seis@gmail.com', 'Registro de Blog: Probando', 'blogs', 18, '2026-02-01 19:36:21', '2026-02-01 19:36:21');
INSERT INTO "public"."logs" VALUES (554, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 19:36:32', '2026-02-01 19:36:32');
INSERT INTO "public"."logs" VALUES (555, 'quarzo@gmail.com', 'Login exitoso', 'users', 26, '2026-02-01 19:36:43', '2026-02-01 19:36:43');
INSERT INTO "public"."logs" VALUES (556, 'quarzo@gmail.com', 'Registro de Blog: Otro de prueba de quarzo', 'blogs', 19, '2026-02-01 19:37:11', '2026-02-01 19:37:11');
INSERT INTO "public"."logs" VALUES (557, 'quarzo@gmail.com', 'Registro de Blog: OTRO DE CUARZO', 'blogs', 20, '2026-02-01 19:38:43', '2026-02-01 19:38:43');
INSERT INTO "public"."logs" VALUES (558, 'quarzo@gmail.com', 'Logout', 'users', 26, '2026-02-01 19:39:00', '2026-02-01 19:39:00');
INSERT INTO "public"."logs" VALUES (559, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 19:39:14', '2026-02-01 19:39:14');
INSERT INTO "public"."logs" VALUES (560, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 19:39:56', '2026-02-01 19:39:56');
INSERT INTO "public"."logs" VALUES (561, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 19:40:15', '2026-02-01 19:40:15');
INSERT INTO "public"."logs" VALUES (562, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 19:42:16', '2026-02-01 19:42:16');
INSERT INTO "public"."logs" VALUES (563, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 19:43:17', '2026-02-01 19:43:17');
INSERT INTO "public"."logs" VALUES (564, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 19:44:39', '2026-02-01 19:44:39');
INSERT INTO "public"."logs" VALUES (565, 'quarzo@gmail.com', 'Login exitoso', 'users', 26, '2026-02-01 19:44:50', '2026-02-01 19:44:50');
INSERT INTO "public"."logs" VALUES (566, 'quarzo@gmail.com', 'Logout', 'users', 26, '2026-02-01 19:45:03', '2026-02-01 19:45:03');
INSERT INTO "public"."logs" VALUES (567, 'pedro@gmail.com', 'Login exitoso', 'users', 27, '2026-02-01 19:45:15', '2026-02-01 19:45:15');
INSERT INTO "public"."logs" VALUES (568, 'pedro@gmail.com', 'Logout', 'users', 27, '2026-02-01 19:45:23', '2026-02-01 19:45:23');
INSERT INTO "public"."logs" VALUES (569, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 19:45:38', '2026-02-01 19:45:38');
INSERT INTO "public"."logs" VALUES (570, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 19:45:47', '2026-02-01 19:45:47');
INSERT INTO "public"."logs" VALUES (571, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 19:45:57', '2026-02-01 19:45:57');
INSERT INTO "public"."logs" VALUES (652, 'visita@gmail.com', 'Logout', 'users', 35, '2026-02-01 23:22:20', '2026-02-01 23:22:20');
INSERT INTO "public"."logs" VALUES (653, 'opera@gmail.com', 'Login exitoso', 'users', 34, '2026-02-01 23:22:28', '2026-02-01 23:22:28');
INSERT INTO "public"."logs" VALUES (572, 'seis@gmail.com', 'Edición de Blog: ID 10 - Carga de Prueba del usuario seis, contando algo mas que nada, para probar el tamaño real, con un texto cada vez más alto, para ver como se organiza la tabla', 'blogs', 10, '2026-02-01 19:46:08', '2026-02-01 19:46:08');
INSERT INTO "public"."logs" VALUES (573, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 19:46:23', '2026-02-01 19:46:23');
INSERT INTO "public"."logs" VALUES (574, 'quarzo@gmail.com', 'Login exitoso', 'users', 26, '2026-02-01 19:46:34', '2026-02-01 19:46:34');
INSERT INTO "public"."logs" VALUES (575, 'quarzo@gmail.com', 'Logout', 'users', 26, '2026-02-01 19:46:48', '2026-02-01 19:46:48');
INSERT INTO "public"."logs" VALUES (576, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 19:46:59', '2026-02-01 19:46:59');
INSERT INTO "public"."logs" VALUES (577, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 19:51:07', '2026-02-01 19:51:07');
INSERT INTO "public"."logs" VALUES (578, 'pedro@gmail.com', 'Login exitoso', 'users', 27, '2026-02-01 19:51:28', '2026-02-01 19:51:28');
INSERT INTO "public"."logs" VALUES (579, 'pedro@gmail.com', 'Logout', 'users', 27, '2026-02-01 19:51:38', '2026-02-01 19:51:38');
INSERT INTO "public"."logs" VALUES (580, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 19:51:51', '2026-02-01 19:51:51');
INSERT INTO "public"."logs" VALUES (581, 'seis@gmail.com', 'Registro de Tema de Foro: Las Peliculas de Netflix', 'temasforos', 11, '2026-02-01 19:56:25', '2026-02-01 19:56:25');
INSERT INTO "public"."logs" VALUES (582, 'seis@gmail.com', 'Edición de Tema de Foro: ID 11', 'temasforos', 11, '2026-02-01 19:56:42', '2026-02-01 19:56:42');
INSERT INTO "public"."logs" VALUES (583, 'seis@gmail.com', 'Registro de Tema de Foro: Tema de Seis', 'temasforos', 12, '2026-02-01 19:58:23', '2026-02-01 19:58:23');
INSERT INTO "public"."logs" VALUES (584, 'seis@gmail.com', 'Registro de Comentario en Tema ID: 6', 'comentariosforos', 14, '2026-02-01 19:59:04', '2026-02-01 19:59:04');
INSERT INTO "public"."logs" VALUES (585, 'seis@gmail.com', 'Edición de Comentario ID: 14', 'comentariosforos', 14, '2026-02-01 20:01:19', '2026-02-01 20:01:19');
INSERT INTO "public"."logs" VALUES (586, 'seis@gmail.com', 'Eliminación de Comentario ID: 14', 'comentariosforos', 14, '2026-02-01 20:01:27', '2026-02-01 20:01:27');
INSERT INTO "public"."logs" VALUES (587, 'seis@gmail.com', 'Registro de Comentario en Tema ID: 6', 'comentariosforos', 15, '2026-02-01 20:01:40', '2026-02-01 20:01:40');
INSERT INTO "public"."logs" VALUES (588, 'seis@gmail.com', 'Registro de Comentario en Tema ID: 12', 'comentariosforos', 16, '2026-02-01 20:01:53', '2026-02-01 20:01:53');
INSERT INTO "public"."logs" VALUES (589, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 20:01:59', '2026-02-01 20:01:59');
INSERT INTO "public"."logs" VALUES (590, 'quarzo@gmail.com', 'Login exitoso', 'users', 26, '2026-02-01 20:02:10', '2026-02-01 20:02:10');
INSERT INTO "public"."logs" VALUES (591, 'quarzo@gmail.com', 'Registro de Comentario en Tema ID: 12', 'comentariosforos', 17, '2026-02-01 20:03:01', '2026-02-01 20:03:01');
INSERT INTO "public"."logs" VALUES (592, 'quarzo@gmail.com', 'Registro de Tema de Foro: Nuevo tema de Quarzo', 'temasforos', 13, '2026-02-01 20:03:22', '2026-02-01 20:03:22');
INSERT INTO "public"."logs" VALUES (593, 'quarzo@gmail.com', 'Logout', 'users', 26, '2026-02-01 20:03:32', '2026-02-01 20:03:32');
INSERT INTO "public"."logs" VALUES (594, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 20:03:42', '2026-02-01 20:03:42');
INSERT INTO "public"."logs" VALUES (595, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 20:04:09', '2026-02-01 20:04:09');
INSERT INTO "public"."logs" VALUES (596, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 20:04:25', '2026-02-01 20:04:25');
INSERT INTO "public"."logs" VALUES (597, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 20:08:27', '2026-02-01 20:08:27');
INSERT INTO "public"."logs" VALUES (598, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 20:08:47', '2026-02-01 20:08:47');
INSERT INTO "public"."logs" VALUES (599, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 20:08:53', '2026-02-01 20:08:53');
INSERT INTO "public"."logs" VALUES (600, 'pedro@gmail.com', 'Login exitoso', 'users', 27, '2026-02-01 20:09:03', '2026-02-01 20:09:03');
INSERT INTO "public"."logs" VALUES (601, 'pedro@gmail.com', 'Logout', 'users', 27, '2026-02-01 20:10:28', '2026-02-01 20:10:28');
INSERT INTO "public"."logs" VALUES (602, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 20:11:02', '2026-02-01 20:11:02');
INSERT INTO "public"."logs" VALUES (603, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 20:13:47', '2026-02-01 20:13:47');
INSERT INTO "public"."logs" VALUES (604, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 20:14:02', '2026-02-01 20:14:02');
INSERT INTO "public"."logs" VALUES (605, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 20:14:09', '2026-02-01 20:14:09');
INSERT INTO "public"."logs" VALUES (606, 'quarzo@gmail.com', 'Login exitoso', 'users', 26, '2026-02-01 20:14:21', '2026-02-01 20:14:21');
INSERT INTO "public"."logs" VALUES (607, 'quarzo@gmail.com', 'Logout', 'users', 26, '2026-02-01 20:16:34', '2026-02-01 20:16:34');
INSERT INTO "public"."logs" VALUES (608, 'pedro@gmail.com', 'Login exitoso', 'users', 27, '2026-02-01 20:16:46', '2026-02-01 20:16:46');
INSERT INTO "public"."logs" VALUES (609, 'pedro@gmail.com', 'Logout', 'users', 27, '2026-02-01 20:16:54', '2026-02-01 20:16:54');
INSERT INTO "public"."logs" VALUES (610, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 20:17:05', '2026-02-01 20:17:05');
INSERT INTO "public"."logs" VALUES (611, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 20:17:21', '2026-02-01 20:17:21');
INSERT INTO "public"."logs" VALUES (612, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 20:17:33', '2026-02-01 20:17:33');
INSERT INTO "public"."logs" VALUES (613, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 20:19:52', '2026-02-01 20:19:52');
INSERT INTO "public"."logs" VALUES (614, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 20:20:03', '2026-02-01 20:20:03');
INSERT INTO "public"."logs" VALUES (615, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 20:20:10', '2026-02-01 20:20:10');
INSERT INTO "public"."logs" VALUES (616, 'quarzo@gmail.com', 'Login exitoso', 'users', 26, '2026-02-01 20:20:22', '2026-02-01 20:20:22');
INSERT INTO "public"."logs" VALUES (617, 'quarzo@gmail.com', 'Logout', 'users', 26, '2026-02-01 20:20:32', '2026-02-01 20:20:32');
INSERT INTO "public"."logs" VALUES (618, 'pedro@gmail.com', 'Login exitoso', 'users', 27, '2026-02-01 20:20:48', '2026-02-01 20:20:48');
INSERT INTO "public"."logs" VALUES (619, 'pedro@gmail.com', 'Logout', 'users', 27, '2026-02-01 20:34:46', '2026-02-01 20:34:46');
INSERT INTO "public"."logs" VALUES (620, 'quarzo@gmail.com', 'Login exitoso', 'users', 26, '2026-02-01 20:34:58', '2026-02-01 20:34:58');
INSERT INTO "public"."logs" VALUES (621, 'quarzo@gmail.com', 'Logout', 'users', 26, '2026-02-01 20:35:08', '2026-02-01 20:35:08');
INSERT INTO "public"."logs" VALUES (622, 'seis@gmail.com', 'Login exitoso', 'users', 5, '2026-02-01 20:35:18', '2026-02-01 20:35:18');
INSERT INTO "public"."logs" VALUES (623, 'seis@gmail.com', 'Logout', 'users', 5, '2026-02-01 20:35:42', '2026-02-01 20:35:42');
INSERT INTO "public"."logs" VALUES (624, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 20:36:04', '2026-02-01 20:36:04');
INSERT INTO "public"."logs" VALUES (625, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 21:36:31', '2026-02-01 21:36:31');
INSERT INTO "public"."logs" VALUES (626, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 21:39:21', '2026-02-01 21:39:21');
INSERT INTO "public"."logs" VALUES (627, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 21:46:50', '2026-02-01 21:46:50');
INSERT INTO "public"."logs" VALUES (628, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 22:07:33', '2026-02-01 22:07:33');
INSERT INTO "public"."logs" VALUES (629, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 22:11:08', '2026-02-01 22:11:08');
INSERT INTO "public"."logs" VALUES (630, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 22:33:11', '2026-02-01 22:33:11');
INSERT INTO "public"."logs" VALUES (631, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 22:43:40', '2026-02-01 22:43:40');
INSERT INTO "public"."logs" VALUES (632, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 22:55:59', '2026-02-01 22:55:59');
INSERT INTO "public"."logs" VALUES (633, 'superman@gmail.com', 'Login exitoso', 'users', 22, '2026-02-01 22:57:28', '2026-02-01 22:57:28');
INSERT INTO "public"."logs" VALUES (634, 'superman@gmail.com', 'Registro de usuario: maximo@gmail.com, rol: 1', 'users', 32, '2026-02-01 22:59:50', '2026-02-01 22:59:50');
INSERT INTO "public"."logs" VALUES (635, 'superman@gmail.com', 'Registro de usuario: super@gmail.com, rol: 2', 'users', 33, '2026-02-01 23:00:30', '2026-02-01 23:00:30');
INSERT INTO "public"."logs" VALUES (636, 'superman@gmail.com', 'Registro de usuario: opera@gmail.com, rol: 3', 'users', 34, '2026-02-01 23:01:07', '2026-02-01 23:01:07');
INSERT INTO "public"."logs" VALUES (637, 'superman@gmail.com', 'Registro de usuario: visita@gmail.com, rol: 4', 'users', 35, '2026-02-01 23:01:39', '2026-02-01 23:01:39');
INSERT INTO "public"."logs" VALUES (638, 'superman@gmail.com', 'Logout', 'users', 22, '2026-02-01 23:02:21', '2026-02-01 23:02:21');
INSERT INTO "public"."logs" VALUES (639, 'maximo@gmail.com', 'Login exitoso', 'users', 32, '2026-02-01 23:02:33', '2026-02-01 23:02:33');
INSERT INTO "public"."logs" VALUES (640, 'maximo@gmail.com', 'Logout', 'users', 32, '2026-02-01 23:02:49', '2026-02-01 23:02:49');
INSERT INTO "public"."logs" VALUES (641, 'super@gmail.com', 'Login exitoso', 'users', 33, '2026-02-01 23:03:02', '2026-02-01 23:03:02');
INSERT INTO "public"."logs" VALUES (642, 'super@gmail.com', 'Logout', 'users', 33, '2026-02-01 23:03:49', '2026-02-01 23:03:49');
INSERT INTO "public"."logs" VALUES (643, 'opera@gmail.com', 'Login exitoso', 'users', 34, '2026-02-01 23:04:04', '2026-02-01 23:04:04');
INSERT INTO "public"."logs" VALUES (644, 'opera@gmail.com', 'Logout', 'users', 34, '2026-02-01 23:04:31', '2026-02-01 23:04:31');
INSERT INTO "public"."logs" VALUES (645, 'visita@gmail.com', 'Login exitoso', 'users', 35, '2026-02-01 23:04:41', '2026-02-01 23:04:41');
INSERT INTO "public"."logs" VALUES (646, 'visita@gmail.com', 'Logout', 'users', 35, '2026-02-01 23:05:05', '2026-02-01 23:05:05');
INSERT INTO "public"."logs" VALUES (647, 'maximo@gmail.com', 'Login exitoso', 'users', 32, '2026-02-01 23:18:16', '2026-02-01 23:18:16');
INSERT INTO "public"."logs" VALUES (648, 'maximo@gmail.com', 'Logout', 'users', 32, '2026-02-01 23:20:31', '2026-02-01 23:20:31');
INSERT INTO "public"."logs" VALUES (649, 'super@gmail.com', 'Login exitoso', 'users', 33, '2026-02-01 23:20:59', '2026-02-01 23:20:59');
INSERT INTO "public"."logs" VALUES (650, 'super@gmail.com', 'Logout', 'users', 33, '2026-02-01 23:21:52', '2026-02-01 23:21:52');
INSERT INTO "public"."logs" VALUES (651, 'visita@gmail.com', 'Login exitoso', 'users', 35, '2026-02-01 23:22:02', '2026-02-01 23:22:02');
INSERT INTO "public"."logs" VALUES (654, 'opera@gmail.com', 'Registro de Blog: Falla de Comida', 'blogs', 21, '2026-02-01 23:22:49', '2026-02-01 23:22:49');
INSERT INTO "public"."logs" VALUES (655, 'opera@gmail.com', 'Logout', 'users', 34, '2026-02-01 23:23:02', '2026-02-01 23:23:02');
INSERT INTO "public"."logs" VALUES (656, 'maximo@gmail.com', 'Login exitoso', 'users', 32, '2026-02-01 23:28:46', '2026-02-01 23:28:46');
INSERT INTO "public"."logs" VALUES (657, 'maximo@gmail.com', 'Logout', 'users', 32, '2026-02-01 23:29:12', '2026-02-01 23:29:12');

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."migrations";
CREATE TABLE "public"."migrations" (
  "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
  "migration" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "batch" int4 NOT NULL
)
;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO "public"."migrations" VALUES (6, '0001_01_01_000000_create_users_table', 1);
INSERT INTO "public"."migrations" VALUES (7, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO "public"."migrations" VALUES (8, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO "public"."migrations" VALUES (9, '2025_12_06_143851_create_personal_access_tokens_table', 1);
INSERT INTO "public"."migrations" VALUES (10, '2025_12_07_135007_create_rol_table', 1);
INSERT INTO "public"."migrations" VALUES (11, '2025_12_07_145454_create_logs_table', 1);
INSERT INTO "public"."migrations" VALUES (12, '2026_01_17_103224_create_categoriadocs_table', 2);
INSERT INTO "public"."migrations" VALUES (13, '2026_01_17_125631_create_documentos_table', 3);
INSERT INTO "public"."migrations" VALUES (14, '2026_01_17_180327_create_blogs_table', 4);
INSERT INTO "public"."migrations" VALUES (15, '2026_01_17_182243_create_calendarios_table', 5);
INSERT INTO "public"."migrations" VALUES (16, '2026_01_18_170347_create_temasforos_table', 6);
INSERT INTO "public"."migrations" VALUES (17, '2026_01_18_204208_create_comentariosforos_table', 7);

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS "public"."password_reset_tokens";
CREATE TABLE "public"."password_reset_tokens" (
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "token" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0)
)
;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS "public"."personal_access_tokens";
CREATE TABLE "public"."personal_access_tokens" (
  "id" int8 NOT NULL DEFAULT nextval('personal_access_tokens_id_seq'::regclass),
  "tokenable_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "tokenable_id" int8 NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "token" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "abilities" text COLLATE "pg_catalog"."default",
  "last_used_at" timestamp(0),
  "expires_at" timestamp(0),
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------
INSERT INTO "public"."personal_access_tokens" VALUES (170, 'App\Models\User', 22, 'auth_token', 'e458fd05e8bc233b93c3934dceb961d5a27ea0755cc150c1dae3d94de84f181e', '["*"]', '2026-02-01 15:20:24', NULL, '2026-02-01 15:11:42', '2026-02-01 15:20:24');
INSERT INTO "public"."personal_access_tokens" VALUES (171, 'App\Models\User', 22, 'auth_token', 'a3a89646ff3967d748f1d1a57fc29fc676d2f7d2e676e9c5e318826165d42ff4', '["*"]', '2026-02-01 15:22:49', NULL, '2026-02-01 15:22:46', '2026-02-01 15:22:49');
INSERT INTO "public"."personal_access_tokens" VALUES (184, 'App\Models\User', 5, 'auth_token', '75fd373c792a945070a8e7a58de6aeae800f7b73d8d0aa4ac7f372304c476cb9', '["*"]', '2026-02-01 19:28:55', NULL, '2026-02-01 19:28:53', '2026-02-01 19:28:55');
INSERT INTO "public"."personal_access_tokens" VALUES (160, 'App\Models\User', 22, 'auth_token', '19439c206efad80dd0a43b044b36757a8d56ef0a0c0bf23d7aad7d3489c13f56', '["*"]', NULL, NULL, '2026-01-31 18:39:43', '2026-01-31 18:39:43');
INSERT INTO "public"."personal_access_tokens" VALUES (162, 'App\Models\User', 22, 'auth_token', '5b750ca65d72926a1206bad100e1071cb9a04a4a98de7d8bcc3bde5d1c3f3392', '["*"]', NULL, NULL, '2026-01-31 18:50:29', '2026-01-31 18:50:29');
INSERT INTO "public"."personal_access_tokens" VALUES (216, 'App\Models\User', 22, 'auth_token', 'e2dcba9b76747defe86984272333b7d30931e0dd3881a8f1ff4106ddf34e050d', '["*"]', '2026-02-01 21:32:54', NULL, '2026-02-01 20:36:04', '2026-02-01 21:32:54');
INSERT INTO "public"."personal_access_tokens" VALUES (176, 'App\Models\User', 22, 'auth_token', '31dbcd45f3ea6141f283a71706042d25222ece16d4ff7a4775a1bb1b9789ddf9', '["*"]', '2026-02-01 18:53:09', NULL, '2026-02-01 18:02:37', '2026-02-01 18:53:09');
INSERT INTO "public"."personal_access_tokens" VALUES (161, 'App\Models\User', 22, 'auth_token', '9d46ab6714bcb14781bf0c8bff5dd531d56465c3081540e39d67c96117273b88', '["*"]', '2026-02-01 00:13:42', NULL, '2026-01-31 18:44:28', '2026-02-01 00:13:42');
INSERT INTO "public"."personal_access_tokens" VALUES (164, 'App\Models\User', 22, 'auth_token', 'd39129b2aaf5cdada381b258d4d2cfc42e424ed5df8961fdd875f25589d40a73', '["*"]', NULL, NULL, '2026-01-31 19:42:22', '2026-01-31 19:42:22');
INSERT INTO "public"."personal_access_tokens" VALUES (217, 'App\Models\User', 22, 'auth_token', '6e014dc372a63e1ba125cd1838cf174b161f0e4972431edd9e3331c831aa91ca', '["*"]', NULL, NULL, '2026-02-01 21:36:31', '2026-02-01 21:36:31');
INSERT INTO "public"."personal_access_tokens" VALUES (167, 'App\Models\User', 22, 'auth_token', '6f9a69f7e11900f67b22e80333b7ff44705c41530559258cf514265405e588a5', '["*"]', '2026-02-01 13:24:55', NULL, '2026-02-01 13:22:02', '2026-02-01 13:24:55');
INSERT INTO "public"."personal_access_tokens" VALUES (172, 'App\Models\User', 22, 'auth_token', '97523f617168a249ba5d374e660942ef30d1e845661523135f766ee6334d7298', '["*"]', '2026-02-01 16:17:33', NULL, '2026-02-01 15:23:55', '2026-02-01 16:17:33');
INSERT INTO "public"."personal_access_tokens" VALUES (152, 'App\Models\User', 1, 'auth_token', '30643878036cc4f0dbc9220b3cbcb8c7206e68b002fc19ce5297af7de73480be', '["*"]', NULL, NULL, '2026-01-31 18:08:00', '2026-01-31 18:08:00');
INSERT INTO "public"."personal_access_tokens" VALUES (219, 'App\Models\User', 22, 'auth_token', '04034895afd00dabb5f9177f4d946c0a66e7e84b110210757a1b5631b5bdf6f9', '["*"]', '2026-02-01 22:29:44', NULL, '2026-02-01 21:46:49', '2026-02-01 22:29:44');
INSERT INTO "public"."personal_access_tokens" VALUES (174, 'App\Models\User', 22, 'auth_token', 'de24a9e723c1a822bc7f6b1e4f31ed2695b8838408ada1fc6f4cdfc0d549a814', '["*"]', '2026-02-01 16:19:54', NULL, '2026-02-01 16:19:52', '2026-02-01 16:19:54');
INSERT INTO "public"."personal_access_tokens" VALUES (173, 'App\Models\User', 22, 'auth_token', 'dd6cdba6bb2cde61c599c3f966ea6905c42c80ef69b8cc918132cd9efc93b063', '["*"]', '2026-02-01 15:49:58', NULL, '2026-02-01 15:48:56', '2026-02-01 15:49:58');
INSERT INTO "public"."personal_access_tokens" VALUES (166, 'App\Models\User', 22, 'auth_token', 'c6ad5c3b4e3b1550e46f3ff36b63b363513b051c92a1dc0e3ae0420bcd7c8f02', '["*"]', '2026-02-01 11:23:14', NULL, '2026-02-01 11:21:56', '2026-02-01 11:23:14');
INSERT INTO "public"."personal_access_tokens" VALUES (218, 'App\Models\User', 22, 'auth_token', '3a867404ce0a9e80ed8a75cade9bdae4553313eaefba1288500c1b0a15ac4cdf', '["*"]', '2026-02-01 21:48:39', NULL, '2026-02-01 21:39:21', '2026-02-01 21:48:39');
INSERT INTO "public"."personal_access_tokens" VALUES (220, 'App\Models\User', 22, 'auth_token', '147c9c8eaf518ebdd708b521a1198ddfdcbbf1ea13b6fe7ce70f87f6ec8c8385', '["*"]', '2026-02-01 22:08:17', NULL, '2026-02-01 22:07:33', '2026-02-01 22:08:17');
INSERT INTO "public"."personal_access_tokens" VALUES (183, 'App\Models\User', 5, 'auth_token', '71c9d661dcae78fbeb3a36c40f36e7eb55e1bb2302c17bbdc5d0090a17f0db9f', '["*"]', '2026-02-01 19:22:16', NULL, '2026-02-01 19:19:33', '2026-02-01 19:22:16');

-- ----------------------------
-- Table structure for rol
-- ----------------------------
DROP TABLE IF EXISTS "public"."rol";
CREATE TABLE "public"."rol" (
  "id" int8 NOT NULL DEFAULT nextval('rol_id_seq'::regclass),
  "rol" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of rol
-- ----------------------------
INSERT INTO "public"."rol" VALUES (1, 'Administrador', NULL, NULL);
INSERT INTO "public"."rol" VALUES (2, 'Supervisor', NULL, NULL);
INSERT INTO "public"."rol" VALUES (3, 'Operador', NULL, NULL);
INSERT INTO "public"."rol" VALUES (4, 'Visitante', NULL, NULL);

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS "public"."sessions";
CREATE TABLE "public"."sessions" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" int8,
  "ip_address" varchar(45) COLLATE "pg_catalog"."default",
  "user_agent" text COLLATE "pg_catalog"."default",
  "payload" text COLLATE "pg_catalog"."default" NOT NULL,
  "last_activity" int4 NOT NULL
)
;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for temasforos
-- ----------------------------
DROP TABLE IF EXISTS "public"."temasforos";
CREATE TABLE "public"."temasforos" (
  "id" int8 NOT NULL DEFAULT nextval('temasforos_id_seq'::regclass),
  "usuario_creador_id" int8 NOT NULL,
  "titulo" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "estado" varchar(10) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of temasforos
-- ----------------------------
INSERT INTO "public"."temasforos" VALUES (3, 22, 'Peliculas de Marvel, dinos la mejor', 'Abierto', '2026-01-31 21:18:58', '2026-01-31 21:18:58');
INSERT INTO "public"."temasforos" VALUES (2, 1, 'Discusion sobre normativa N3 (Actualizado)', 'Cerrado', '2026-01-18 18:04:49', '2026-01-31 21:43:00');
INSERT INTO "public"."temasforos" VALUES (5, 22, 'Peliculas de Terror, dinos la mejor', 'Abierto', '2026-01-31 21:51:37', '2026-01-31 21:51:37');
INSERT INTO "public"."temasforos" VALUES (6, 22, 'Peliculas de Dibujos Animados, dinos la mejor', 'Abierto', '2026-01-31 23:33:16', '2026-01-31 23:33:16');
INSERT INTO "public"."temasforos" VALUES (4, 22, 'Peliculas de DC, dinos la mejor', 'Cerrado', '2026-01-31 21:51:02', '2026-02-01 17:22:06');
INSERT INTO "public"."temasforos" VALUES (11, 5, 'Las Peliculas de Netflix 2', 'Abierto', '2026-02-01 19:56:25', '2026-02-01 19:56:42');
INSERT INTO "public"."temasforos" VALUES (12, 5, 'Tema de Seis', 'Abierto', '2026-02-01 19:58:23', '2026-02-01 19:58:23');
INSERT INTO "public"."temasforos" VALUES (13, 26, 'Nuevo tema de Quarzo', 'Abierto', '2026-02-01 20:03:22', '2026-02-01 20:03:22');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "rol_id" int4 NOT NULL,
  "email" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(150) COLLATE "pg_catalog"."default" NOT NULL,
  "unidad_operativa" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "activo" bool NOT NULL,
  "email_verified_at" timestamp(0),
  "remember_token" varchar(100) COLLATE "pg_catalog"."default",
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, 1, 'admin@gmail.com', '$2y$12$EyOi.Lrld1yqs9xWkA2adeB5LNdLCB/6.sKR7aY9Lf9Gp63QmYfga', 'Adminis Becerra', 'Caracas', 't', NULL, NULL, '2025-12-07 15:09:18', '2026-02-01 18:55:56');
INSERT INTO "public"."users" VALUES (23, 4, 'aquaman@gmail.com', '$2y$12$R7cEsLBJmyjgJZQR19H07uv5WcWrDwcaCd2dKxBK/qstNE7Q8neZ2', 'Aquaman1', 'Atlantis1', 't', NULL, NULL, '2026-01-09 23:25:27', '2026-02-01 18:56:01');
INSERT INTO "public"."users" VALUES (32, 1, 'maximo@gmail.com', '$2y$12$NsK4vv1EfgKzjqKEiu65y.w4v5ypSCngBzFwK1JY4W8VqzMkgTjc.', 'Maximo Garcia', 'CANTV Av Libertador', 't', NULL, NULL, '2026-02-01 22:59:50', '2026-02-01 22:59:50');
INSERT INTO "public"."users" VALUES (5, 2, 'seis@gmail.com', '$2y$12$b7CuVG2aHzzsQ0fRxX.nvu.7UL4Cd60qva1k8hfYD5sgk0pFifR5y', 'Seis Jimenez', 'Artigas Error 6', 't', NULL, NULL, '2025-12-07 21:52:16', '2025-12-08 00:02:56');
INSERT INTO "public"."users" VALUES (33, 2, 'super@gmail.com', '$2y$12$8KzciXE5QmIn9HAD0N4IBuUSFFOzXr/wdT.JG4qVgCJp1WrmRPlsS', 'Super Pereira', 'Telepuerto Baemari', 't', NULL, NULL, '2026-02-01 23:00:30', '2026-02-01 23:00:30');
INSERT INTO "public"."users" VALUES (27, 4, 'pedro@gmail.com', '$2y$12$mDZTPHqVSLw4cLZ/lllqe.xnhTxVmDKUg3hMuwggCXQNCGhQsSOf2', 'Pedro Lucas', 'Catia', 't', NULL, NULL, '2026-01-31 11:12:24', '2026-01-31 11:12:24');
INSERT INTO "public"."users" VALUES (34, 3, 'opera@gmail.com', '$2y$12$3ivUPUfyufK61iKxHSenLeQCseRMiNMpFGb1XrJMuvYuOK03ppom.', 'Opera Camacho', 'Estación Camatagua', 't', NULL, NULL, '2026-02-01 23:01:07', '2026-02-01 23:01:07');
INSERT INTO "public"."users" VALUES (3, 3, 'tres@gmail.com', '$2y$12$pobN8oGjVght.7.frf2w5upUX5sxtsCLTd9uoATzy/dEoqAeOv2P2', 'Usuario 3 modificado', 'Camatagua, edo Aragua', 'f', NULL, NULL, '2025-12-07 16:36:20', '2026-02-01 18:46:04');
INSERT INTO "public"."users" VALUES (7, 3, 'ocho@gmail.com', '$2y$12$itcSwiLS44.x2ncJ7QIQLOyjX5YYRFnz8hS89mKMjxpuM.Q0A25Wq', 'Usuario ocho', 'La Yaguara', 't', NULL, NULL, '2025-12-07 21:52:45', '2025-12-07 21:52:45');
INSERT INTO "public"."users" VALUES (8, 3, 'nueve@gmail.com', '$2y$12$UNtcngr4IG8BTDTWUYi9aexo6XyocF62mjuDzaDRwdmzSqlXGt0mC', 'Usuario nueve', 'La Yaguara', 't', NULL, NULL, '2025-12-07 21:52:53', '2025-12-07 21:52:53');
INSERT INTO "public"."users" VALUES (10, 3, 'once@gmail.com', '$2y$12$jscM0hpJAB6zzypE4W3CHeydPk1h.P6p4/HTCXrwZDeo2d4IZs4TO', 'Usuario once', 'Petare', 't', NULL, NULL, '2025-12-07 21:53:16', '2025-12-07 21:53:16');
INSERT INTO "public"."users" VALUES (11, 3, 'doce@gmail.com', '$2y$12$CcUdcyhZWU2sLiv06zpoIeFqlWXN0TgLH9rQrzKzlRA2ZDHPsf00q', 'Usuario doce', 'Petare', 't', NULL, NULL, '2025-12-07 21:53:23', '2025-12-07 21:53:23');
INSERT INTO "public"."users" VALUES (13, 3, 'catorce@gmail.com', '$2y$12$Z/nBbf4mHHzrW22eLTlK1uzbVVlRyz3pBcqJvUosD5YEZjWHDWxHy', 'Usuario catorce', 'El Marquez', 't', NULL, NULL, '2025-12-07 21:53:47', '2025-12-07 21:53:47');
INSERT INTO "public"."users" VALUES (14, 3, 'quince@gmail.com', '$2y$12$HiPXuXbYJTkQVuMHVLKhD.n/D5V2Af6LoivVkNHnSqxQKCNur2ZlW', 'Usuario quince', 'El Marquez', 't', NULL, NULL, '2025-12-07 21:53:56', '2025-12-07 21:53:56');
INSERT INTO "public"."users" VALUES (15, 3, 'dieciseis@gmail.com', '$2y$12$Go6gd7plsUlTI4B9/gJmk.dTvDEqGbJNBXXEGvmd./9e5cgr7kfjK', 'Usuario dieciseis', 'El Marquez', 't', NULL, NULL, '2025-12-07 21:54:05', '2025-12-07 21:54:05');
INSERT INTO "public"."users" VALUES (2, 3, 'uno@gmail.com', '$2y$12$jj1HivNbTPsZGezSepRynejQm/GNLvaG1GBRcJjpeYK7Xeb2UD/ZW', 'LimoCoconera', 'Limonera', 'f', NULL, NULL, '2025-12-07 15:28:43', '2025-12-07 22:22:06');
INSERT INTO "public"."users" VALUES (16, 3, 'dienciocho@gmail.com', '$2y$12$Jh5QuBIrysmjElLz5jucsOLHH0IT9JlqxiDsCZeabPfeP3RuPk15m', 'Usuario dienciocho', 'El Marquez', 'f', NULL, NULL, '2025-12-07 21:54:16', '2025-12-07 22:25:32');
INSERT INTO "public"."users" VALUES (6, 3, 'siete@gmail.com', '$2y$12$f4rK/DORiPeO46tL9kam4.wLe0W1deL467pZVJZ8v51SxkDVH..9e', 'Usuario siete', 'La Yaguara', 'f', NULL, NULL, '2025-12-07 21:52:32', '2025-12-07 22:29:43');
INSERT INTO "public"."users" VALUES (17, 3, 'lucas1@gmail.com', '$2y$12$urE/1kExzIBWNLP0XuT8juaKvMiRXCAHGaaN7Q8/GiitQYkPTiq9u', 'Lucas Adams', 'CNT', 't', NULL, NULL, '2025-12-07 22:56:42', '2025-12-07 22:56:42');
INSERT INTO "public"."users" VALUES (4, 3, 'cinco@gmail.com', '$2y$12$MVkqOUjpaD7CSZfjy.pwd.CGEtkX53y2zBsyaUXRV6J0VmAw3zbPi', 'Usuario cinco', 'Camatagua', 'f', NULL, NULL, '2025-12-07 21:52:03', '2025-12-07 23:03:54');
INSERT INTO "public"."users" VALUES (18, 2, 'many@gmail.com', '$2y$12$Yfb1pRGcA7vUK4hyWgTYDOBoHD.9auNgx/1n8oQJ2fD/oeOmd6d5O', 'Many', 'La Yaguara', 't', NULL, NULL, '2025-12-07 23:04:49', '2025-12-07 23:04:49');
INSERT INTO "public"."users" VALUES (20, 2, 'pruebausuario@gmail.com', '$2y$12$tEgAl0Hoe7OLnUwBaOseHurfZNN.S66nDNFbcvGquuWRXsl5BRJd.', 'Usuario Prueba1', 'Caracas Linda', 'f', NULL, NULL, '2025-12-09 22:17:01', '2026-01-09 21:51:40');
INSERT INTO "public"."users" VALUES (35, 4, 'visita@gmail.com', '$2y$12$L6aWmQrxKOC7Xqgy7xx/xuRWIurVDjEmQ./NebaS4nMz9jAo24bUa', 'Visita Carrillo', 'CANTV Av Libertador', 't', NULL, NULL, '2026-02-01 23:01:39', '2026-02-01 23:01:39');
INSERT INTO "public"."users" VALUES (21, 1, 'batman@gmail.com', '$2y$12$yv0YpIl/gW8oUXpn4MrNae7sKWvLOB/IolbAtVZFRbvW.JefNh.qi', 'Batman', 'La Yaguara', 't', NULL, NULL, '2026-01-09 21:51:06', '2026-01-09 23:14:56');
INSERT INTO "public"."users" VALUES (22, 1, 'superman@gmail.com', '$2y$12$uoFa93nlJ1qCUnDbvEIX2uMfdLgp3xoNmh7ayBmtWPL8Z5BFBt2vG', 'Superman', 'metropolis', 't', NULL, NULL, '2026-01-09 23:08:05', '2026-01-31 18:39:43');
INSERT INTO "public"."users" VALUES (12, 3, 'trece@gmail.com', '$2y$12$Jc9YzkOBkhCJMHgCDxRFk.69jODuQktRXzoOvGJ3eyBcIawK5D9Im', 'Usuario trece', 'Petare', 'f', NULL, NULL, '2025-12-07 21:53:33', '2025-12-07 23:38:32');
INSERT INTO "public"."users" VALUES (28, 3, 'prueba456@gmail.com', '$2y$12$cW/y2iu1u4aMbDc9VEIG7e0Y/kEkn9yMm/lF0GgrqHNp4SRXXy5IS', 'Usuario 456', 'El Marquez', 't', NULL, NULL, '2026-02-01 13:22:21', '2026-02-01 13:22:21');
INSERT INTO "public"."users" VALUES (19, 1, 'dientes@gmail.com', '$2y$12$T7i/36NqIPmFwbefA9AcwOMZ5CvEtVpXNjIaOZIouKOxQ77uvbCA6', 'Diego Diente de Sable', 'Era de Hielo', 't', NULL, NULL, '2025-12-07 23:39:57', '2025-12-07 23:39:57');
INSERT INTO "public"."users" VALUES (29, 2, 'ironman@gmail.com', '$2y$12$NwYLZWIfA2hAkrwIxCFhC.H.migdv4hqT5prWkbGJTYGnFeO6e3K2', 'IronMan', 'Camatagua', 't', NULL, NULL, '2026-02-01 14:19:25', '2026-02-01 14:19:25');
INSERT INTO "public"."users" VALUES (30, 2, 'pepeto@gmail.com', '$2y$12$BB7p/8uwp5iI.pNPOLv1W.scBgch22hd5I4Vv8URd90GBW2gwq87G', 'pepeto', 'pepetolandia', 't', NULL, NULL, '2026-02-01 14:23:09', '2026-02-01 14:23:09');
INSERT INTO "public"."users" VALUES (24, 3, 'wonderwoman@gmail.com', '$2y$12$MpG8.sCpBTeAc2ETri836uMCAeV4x.wJtjcecO4GdCnE0PZdx8/QO', 'wonderwoman', 'sdasdsad', 't', NULL, NULL, '2026-01-10 00:01:14', '2026-01-10 00:01:14');
INSERT INTO "public"."users" VALUES (25, 1, 'coco@gmail.com', '$2y$12$i6Rld6P1IJnGKh0ivh6C8.xoW7MQzvkOmj81B9ZDIohsOQxDmnWj.', 'Coco Sierra', 'Casa', 't', NULL, NULL, '2026-01-17 08:55:55', '2026-01-17 08:55:55');
INSERT INTO "public"."users" VALUES (9, 3, 'diez@gmail.com', '$2y$12$Y0rNWARiNBwcStP0IB65BekOBzQzZt1VKY1F97nbjYyPAyCzHPwIa', 'Usuario diez modificado', 'Petare modificado', 'f', NULL, NULL, '2025-12-07 21:53:08', '2025-12-09 22:16:14');
INSERT INTO "public"."users" VALUES (31, 1, 'iceman@gmail.com', '$2y$12$wKm1YulfgFfGpIcKplSCZ.Xt7JVB4rxkzFAQOdUz4BE.ZSG6o3f/O', 'Iceman', 'Camatagua', 't', NULL, NULL, '2026-02-01 14:29:21', '2026-02-01 14:29:21');
INSERT INTO "public"."users" VALUES (26, 3, 'quarzo@gmail.com', '$2y$12$qb5ahfd3i60Li6XjTHNu9eB7iebM1h8tqXvGttvwJ1PwdABsIl73W', 'Quarzo Garcia', 'Catia', 't', NULL, NULL, '2026-01-31 11:11:05', '2026-02-01 18:53:09');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."blogs_id_seq"
OWNED BY "public"."blogs"."id";
SELECT setval('"public"."blogs_id_seq"', 21, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."calendarios_id_seq"
OWNED BY "public"."calendarios"."id";
SELECT setval('"public"."calendarios_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."categoriadocs_id_seq"
OWNED BY "public"."categoriadocs"."id";
SELECT setval('"public"."categoriadocs_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."comentariosforos_id_seq"
OWNED BY "public"."comentariosforos"."id";
SELECT setval('"public"."comentariosforos_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."documentos_id_seq"
OWNED BY "public"."documentos"."id";
SELECT setval('"public"."documentos_id_seq"', 21, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."failed_jobs_id_seq"
OWNED BY "public"."failed_jobs"."id";
SELECT setval('"public"."failed_jobs_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."jobs_id_seq"
OWNED BY "public"."jobs"."id";
SELECT setval('"public"."jobs_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."logs_id_seq"
OWNED BY "public"."logs"."id";
SELECT setval('"public"."logs_id_seq"', 657, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."migrations_id_seq"
OWNED BY "public"."migrations"."id";
SELECT setval('"public"."migrations_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."personal_access_tokens_id_seq"
OWNED BY "public"."personal_access_tokens"."id";
SELECT setval('"public"."personal_access_tokens_id_seq"', 232, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."rol_id_seq"
OWNED BY "public"."rol"."id";
SELECT setval('"public"."rol_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."temasforos_id_seq"
OWNED BY "public"."temasforos"."id";
SELECT setval('"public"."temasforos_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 35, true);

-- ----------------------------
-- Primary Key structure for table blogs
-- ----------------------------
ALTER TABLE "public"."blogs" ADD CONSTRAINT "blogs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table cache
-- ----------------------------
ALTER TABLE "public"."cache" ADD CONSTRAINT "cache_pkey" PRIMARY KEY ("key");

-- ----------------------------
-- Primary Key structure for table cache_locks
-- ----------------------------
ALTER TABLE "public"."cache_locks" ADD CONSTRAINT "cache_locks_pkey" PRIMARY KEY ("key");

-- ----------------------------
-- Primary Key structure for table calendarios
-- ----------------------------
ALTER TABLE "public"."calendarios" ADD CONSTRAINT "calendarios_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table categoriadocs
-- ----------------------------
ALTER TABLE "public"."categoriadocs" ADD CONSTRAINT "categoriadocs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table comentariosforos
-- ----------------------------
ALTER TABLE "public"."comentariosforos" ADD CONSTRAINT "comentariosforos_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table documentos
-- ----------------------------
ALTER TABLE "public"."documentos" ADD CONSTRAINT "documentos_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table failed_jobs
-- ----------------------------
ALTER TABLE "public"."failed_jobs" ADD CONSTRAINT "failed_jobs_uuid_unique" UNIQUE ("uuid");

-- ----------------------------
-- Primary Key structure for table failed_jobs
-- ----------------------------
ALTER TABLE "public"."failed_jobs" ADD CONSTRAINT "failed_jobs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table job_batches
-- ----------------------------
ALTER TABLE "public"."job_batches" ADD CONSTRAINT "job_batches_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table jobs
-- ----------------------------
CREATE INDEX "jobs_queue_index" ON "public"."jobs" USING btree (
  "queue" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table jobs
-- ----------------------------
ALTER TABLE "public"."jobs" ADD CONSTRAINT "jobs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table logs
-- ----------------------------
ALTER TABLE "public"."logs" ADD CONSTRAINT "logs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table migrations
-- ----------------------------
ALTER TABLE "public"."migrations" ADD CONSTRAINT "migrations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table password_reset_tokens
-- ----------------------------
ALTER TABLE "public"."password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("email");

-- ----------------------------
-- Indexes structure for table personal_access_tokens
-- ----------------------------
CREATE INDEX "personal_access_tokens_expires_at_index" ON "public"."personal_access_tokens" USING btree (
  "expires_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "personal_access_tokens_tokenable_type_tokenable_id_index" ON "public"."personal_access_tokens" USING btree (
  "tokenable_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "tokenable_id" "pg_catalog"."int8_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table personal_access_tokens
-- ----------------------------
ALTER TABLE "public"."personal_access_tokens" ADD CONSTRAINT "personal_access_tokens_token_unique" UNIQUE ("token");

-- ----------------------------
-- Primary Key structure for table personal_access_tokens
-- ----------------------------
ALTER TABLE "public"."personal_access_tokens" ADD CONSTRAINT "personal_access_tokens_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table rol
-- ----------------------------
ALTER TABLE "public"."rol" ADD CONSTRAINT "rol_rol_unique" UNIQUE ("rol");

-- ----------------------------
-- Primary Key structure for table rol
-- ----------------------------
ALTER TABLE "public"."rol" ADD CONSTRAINT "rol_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sessions
-- ----------------------------
CREATE INDEX "sessions_last_activity_index" ON "public"."sessions" USING btree (
  "last_activity" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "sessions_user_id_index" ON "public"."sessions" USING btree (
  "user_id" "pg_catalog"."int8_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sessions
-- ----------------------------
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table temasforos
-- ----------------------------
ALTER TABLE "public"."temasforos" ADD CONSTRAINT "temasforos_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_email_unique" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table blogs
-- ----------------------------
ALTER TABLE "public"."blogs" ADD CONSTRAINT "blogs_usuario_reporte_id_foreign" FOREIGN KEY ("usuario_reporte_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table comentariosforos
-- ----------------------------
ALTER TABLE "public"."comentariosforos" ADD CONSTRAINT "comentariosforos_tema_id_foreign" FOREIGN KEY ("tema_id") REFERENCES "public"."temasforos" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."comentariosforos" ADD CONSTRAINT "comentariosforos_usuario_creador_id_foreign" FOREIGN KEY ("usuario_creador_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table documentos
-- ----------------------------
ALTER TABLE "public"."documentos" ADD CONSTRAINT "documentos_categoria_id_foreign" FOREIGN KEY ("categoria_id") REFERENCES "public"."categoriadocs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."documentos" ADD CONSTRAINT "documentos_usuario_creador_id_foreign" FOREIGN KEY ("usuario_creador_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
