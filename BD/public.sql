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

 Date: 18/02/2026 21:27:49
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
INSERT INTO "public"."blogs" VALUES (2, 1, 'Interferencia electromagnética en Caracas, causa fue identificada como una fuente externa de RF que fue neutralizada', 'Media', 'Cerrado', '2026-02-06 18:36:39', '2026-02-06 18:36:39');
INSERT INTO "public"."blogs" VALUES (4, 1, 'Prueba2', 'Baja', 'En Progreso', '2026-02-13 20:48:36', '2026-02-13 20:48:36');
INSERT INTO "public"."blogs" VALUES (5, 1, 'Prueba3', 'Baja', 'En Progreso', '2026-02-13 20:49:08', '2026-02-13 20:49:08');
INSERT INTO "public"."blogs" VALUES (6, 1, 'Prueba4', 'Baja', 'En Progreso', '2026-02-13 20:49:19', '2026-02-13 20:49:19');
INSERT INTO "public"."blogs" VALUES (7, 1, 'Prueba5', 'Baja', 'En Progreso', '2026-02-13 20:51:33', '2026-02-13 20:51:33');
INSERT INTO "public"."blogs" VALUES (3, 1, 'Prueba1', 'Baja', 'Cerrado', '2026-02-13 20:48:21', '2026-02-16 15:33:05');
INSERT INTO "public"."blogs" VALUES (1, 1, 'Degradación crítica de señal en Banda Ku - Camatagua', 'Alta', 'Cerrado', '2026-02-06 18:35:19', '2026-02-16 16:05:56');

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
INSERT INTO "public"."calendarios" VALUES (1, 1, 'Actualización de firmware - Equipos de monitoreo', '2026-02-01 08:00:00', '2026-02-01 10:00:00', '2026-02-06 20:25:43', '2026-02-06 20:25:43');
INSERT INTO "public"."calendarios" VALUES (2, 1, 'Calibración de antenas', '2026-02-07 08:00:00', '2026-02-07 10:00:00', '2026-02-06 20:31:58', '2026-02-06 20:31:58');
INSERT INTO "public"."calendarios" VALUES (3, 1, 'Mantenimiento preventivo - Sistema de refrigeración', '2026-02-06 16:32:00', '2026-02-06 22:29:00', '2026-02-06 20:32:55', '2026-02-06 20:32:55');
INSERT INTO "public"."calendarios" VALUES (5, 1, 'Ajustes Base de Antena', '2026-01-02 15:30:00', '2026-01-02 17:30:00', '2026-02-08 15:22:24', '2026-02-08 15:22:24');
INSERT INTO "public"."calendarios" VALUES (8, 1, 'Prueba', '2025-12-08 16:16:00', '2025-12-18 16:17:00', '2026-02-08 16:17:16', '2026-02-08 16:17:16');
INSERT INTO "public"."calendarios" VALUES (9, 1, 'Mantenimiento Sala de Pruebas', '2026-03-01 22:27:00', '2026-03-01 23:27:00', '2026-02-13 22:27:59', '2026-02-13 22:27:59');
INSERT INTO "public"."calendarios" VALUES (10, 1, 'Probando', '2026-03-11 15:46:00', '2026-03-12 15:51:00', '2026-02-16 15:51:36', '2026-02-16 15:51:36');

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
INSERT INTO "public"."categoriadocs" VALUES (1, 'Procedimiento', NULL, NULL);
INSERT INTO "public"."categoriadocs" VALUES (2, 'Manual', NULL, NULL);
INSERT INTO "public"."categoriadocs" VALUES (3, 'Diagrama', NULL, NULL);

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
INSERT INTO "public"."comentariosforos" VALUES (1, 1, 1, 'Falla persistente en equipo', '2026-02-06 20:22:50', '2026-02-06 20:22:50');
INSERT INTO "public"."comentariosforos" VALUES (2, 2, 1, 'Se realizaron pruebas y aún hay problemas', '2026-02-08 16:32:57', '2026-02-08 16:32:57');

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
INSERT INTO "public"."documentos" VALUES (2, 1, 1, 'Manual Router Cisco', 'documentos/eTAqLNL6TPvkwHAvgbb3cL8wMdLLZzIWzna58kxl.pdf', '1.0', '2026-01-13', '2026-02-06 19:55:11', '2026-02-06 19:55:11');
INSERT INTO "public"."documentos" VALUES (5, 2, 1, 'Prueba 2', 'documentos/zb0nZ1ThgqMdiX9liSsWQmEOim6t7IUV9rlH89Ka.pdf', '2.0', '2026-02-03', '2026-02-14 11:21:41', '2026-02-14 11:21:41');
INSERT INTO "public"."documentos" VALUES (3, 2, 1, 'Manual Router DLINK 123', 'documentos/PjfPaZbqcr9aQJCsU2wQt8nhxmvDxYhrBlKV5eDI.pdf', '1.0', '2026-02-02', '2026-02-06 19:57:13', '2026-02-14 12:31:36');
INSERT INTO "public"."documentos" VALUES (6, 2, 1, 'Prueba', 'documentos/Jmuw19TfPZ7SM9BTVr0l1CGuEkeaQaKRhuToyUbk.pdf', '1.0', '2026-02-16', '2026-02-16 15:38:28', '2026-02-16 15:38:28');

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
INSERT INTO "public"."logs" VALUES (1, 'SYSTEM', 'Creación inicial del administrador maestro: admin@gmail.com', 'users', 1, '2026-02-06 18:13:35', '2026-02-06 18:13:35');
INSERT INTO "public"."logs" VALUES (2, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 18:14:13', '2026-02-06 18:14:13');
INSERT INTO "public"."logs" VALUES (3, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 18:14:53', '2026-02-06 18:14:53');
INSERT INTO "public"."logs" VALUES (4, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 18:18:32', '2026-02-06 18:18:32');
INSERT INTO "public"."logs" VALUES (5, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-06 18:18:35', '2026-02-06 18:18:35');
INSERT INTO "public"."logs" VALUES (6, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 18:29:32', '2026-02-06 18:29:32');
INSERT INTO "public"."logs" VALUES (7, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-06 18:30:08', '2026-02-06 18:30:08');
INSERT INTO "public"."logs" VALUES (8, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 18:30:37', '2026-02-06 18:30:37');
INSERT INTO "public"."logs" VALUES (9, 'admin@gmail.com', 'Registro de Blog: Degradación crítica de señal en Banda Ku - Camatagua', 'blogs', 1, '2026-02-06 18:35:19', '2026-02-06 18:35:19');
INSERT INTO "public"."logs" VALUES (10, 'admin@gmail.com', 'Registro de Blog: Interferencia electromagnética en Caracas, causa fue identificada como una fuente externa de RF que fue neutralizada', 'blogs', 2, '2026-02-06 18:36:39', '2026-02-06 18:36:39');
INSERT INTO "public"."logs" VALUES (11, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-06 18:49:50', '2026-02-06 18:49:50');
INSERT INTO "public"."logs" VALUES (12, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 18:50:02', '2026-02-06 18:50:02');
INSERT INTO "public"."logs" VALUES (13, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 18:57:23', '2026-02-06 18:57:23');
INSERT INTO "public"."logs" VALUES (14, 'admin@gmail.com', 'Creado documento: Gúia de Bash', 'documento', 1, '2026-02-06 18:58:26', '2026-02-06 18:58:26');
INSERT INTO "public"."logs" VALUES (15, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 19:36:04', '2026-02-06 19:36:04');
INSERT INTO "public"."logs" VALUES (16, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-06 19:44:37', '2026-02-06 19:44:37');
INSERT INTO "public"."logs" VALUES (17, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 19:44:49', '2026-02-06 19:44:49');
INSERT INTO "public"."logs" VALUES (18, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-06 19:46:43', '2026-02-06 19:46:43');
INSERT INTO "public"."logs" VALUES (19, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 19:46:53', '2026-02-06 19:46:53');
INSERT INTO "public"."logs" VALUES (20, 'admin@gmail.com', 'Creado documento: Manual Router Cisco', 'documento', 2, '2026-02-06 19:55:11', '2026-02-06 19:55:11');
INSERT INTO "public"."logs" VALUES (21, 'admin@gmail.com', 'Creado documento: Manual Router DLINK', 'documento', 3, '2026-02-06 19:57:13', '2026-02-06 19:57:13');
INSERT INTO "public"."logs" VALUES (22, 'admin@gmail.com', 'Eliminado documento y archivo físico: Gúia de Bash', 'documento', 1, '2026-02-06 19:57:24', '2026-02-06 19:57:24');
INSERT INTO "public"."logs" VALUES (23, 'admin@gmail.com', 'Registro de Tema de Foro: ERROR: Código de falla E-401 en modulador de Baemari', 'temasforos', 1, '2026-02-06 20:21:21', '2026-02-06 20:21:21');
INSERT INTO "public"."logs" VALUES (24, 'admin@gmail.com', 'Registro de Comentario en Tema ID: 1', 'comentariosforos', 1, '2026-02-06 20:22:50', '2026-02-06 20:22:50');
INSERT INTO "public"."logs" VALUES (25, 'admin@gmail.com', 'Registro en calendario: Actualización de firmware - Equipos de monitoreo', 'calendarios', 1, '2026-02-06 20:25:43', '2026-02-06 20:25:43');
INSERT INTO "public"."logs" VALUES (26, 'admin@gmail.com', 'Registro en calendario: Calibración de antenas', 'calendarios', 2, '2026-02-06 20:31:58', '2026-02-06 20:31:58');
INSERT INTO "public"."logs" VALUES (27, 'admin@gmail.com', 'Registro en calendario: Mantenimiento preventivo - Sistema de refrigeración', 'calendarios', 3, '2026-02-06 20:32:55', '2026-02-06 20:32:55');
INSERT INTO "public"."logs" VALUES (28, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 20:36:16', '2026-02-06 20:36:16');
INSERT INTO "public"."logs" VALUES (29, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-06 20:46:30', '2026-02-06 20:46:30');
INSERT INTO "public"."logs" VALUES (30, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 20:51:53', '2026-02-06 20:51:53');
INSERT INTO "public"."logs" VALUES (31, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-06 20:58:58', '2026-02-06 20:58:58');
INSERT INTO "public"."logs" VALUES (32, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 20:59:18', '2026-02-06 20:59:18');
INSERT INTO "public"."logs" VALUES (33, 'admin@gmail.com', 'Registro de usuario: maximo@gmail.com, rol: 1', 'users', 2, '2026-02-06 21:00:40', '2026-02-06 21:00:40');
INSERT INTO "public"."logs" VALUES (34, 'admin@gmail.com', 'Registro de usuario: super@gmail.com, rol: 2', 'users', 3, '2026-02-06 21:01:51', '2026-02-06 21:01:51');
INSERT INTO "public"."logs" VALUES (35, 'admin@gmail.com', 'Registro de usuario: opera@gmail.com, rol: 3', 'users', 4, '2026-02-06 21:02:50', '2026-02-06 21:02:50');
INSERT INTO "public"."logs" VALUES (36, 'admin@gmail.com', 'Registro de usuario: visita@gmail.com, rol: 4', 'users', 5, '2026-02-06 21:03:54', '2026-02-06 21:03:54');
INSERT INTO "public"."logs" VALUES (37, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-06 21:04:04', '2026-02-06 21:04:04');
INSERT INTO "public"."logs" VALUES (38, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-06 21:06:54', '2026-02-06 21:06:54');
INSERT INTO "public"."logs" VALUES (39, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-06 21:15:53', '2026-02-06 21:15:53');
INSERT INTO "public"."logs" VALUES (40, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 11:37:47', '2026-02-08 11:37:47');
INSERT INTO "public"."logs" VALUES (41, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 12:25:18', '2026-02-08 12:25:18');
INSERT INTO "public"."logs" VALUES (42, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 12:39:50', '2026-02-08 12:39:50');
INSERT INTO "public"."logs" VALUES (43, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 12:46:26', '2026-02-08 12:46:26');
INSERT INTO "public"."logs" VALUES (44, 'admin@gmail.com', 'Registro de Tema de Foro: Consulta sobre compatibilidad de firmware v2.5 con equipos de monitoreo', 'temasforos', 2, '2026-02-08 14:43:01', '2026-02-08 14:43:01');
INSERT INTO "public"."logs" VALUES (45, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 14:49:29', '2026-02-08 14:49:29');
INSERT INTO "public"."logs" VALUES (46, 'admin@gmail.com', 'Registro en calendario: Actualización de firmware - Equipos de Pruebas', 'calendarios', 4, '2026-02-08 15:21:32', '2026-02-08 15:21:32');
INSERT INTO "public"."logs" VALUES (47, 'admin@gmail.com', 'Registro en calendario: Ajustes Base de Antena', 'calendarios', 5, '2026-02-08 15:22:24', '2026-02-08 15:22:24');
INSERT INTO "public"."logs" VALUES (48, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 15:31:25', '2026-02-08 15:31:25');
INSERT INTO "public"."logs" VALUES (49, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 15:43:50', '2026-02-08 15:43:50');
INSERT INTO "public"."logs" VALUES (50, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 15:45:17', '2026-02-08 15:45:17');
INSERT INTO "public"."logs" VALUES (51, 'admin@gmail.com', 'Edición en calendario: ID 4', 'calendarios', 4, '2026-02-08 15:59:23', '2026-02-08 15:59:23');
INSERT INTO "public"."logs" VALUES (52, 'admin@gmail.com', 'Edición en calendario: ID 4', 'calendarios', 4, '2026-02-08 15:59:34', '2026-02-08 15:59:34');
INSERT INTO "public"."logs" VALUES (53, 'admin@gmail.com', 'Edición en calendario: ID 4', 'calendarios', 4, '2026-02-08 16:03:16', '2026-02-08 16:03:16');
INSERT INTO "public"."logs" VALUES (54, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 16:05:55', '2026-02-08 16:05:55');
INSERT INTO "public"."logs" VALUES (55, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 16:07:23', '2026-02-08 16:07:23');
INSERT INTO "public"."logs" VALUES (56, 'admin@gmail.com', 'Eliminación en calendario: Actualización de firmware - Equipos de Pruebas', 'calendarios', 4, '2026-02-08 16:10:33', '2026-02-08 16:10:33');
INSERT INTO "public"."logs" VALUES (57, 'admin@gmail.com', 'Registro en calendario: Mantenimiento Sala de Baterias', 'calendarios', 6, '2026-02-08 16:11:49', '2026-02-08 16:11:49');
INSERT INTO "public"."logs" VALUES (58, 'admin@gmail.com', 'Edición en calendario: ID 6', 'calendarios', 6, '2026-02-08 16:12:54', '2026-02-08 16:12:54');
INSERT INTO "public"."logs" VALUES (59, 'admin@gmail.com', 'Edición en calendario: ID 6', 'calendarios', 6, '2026-02-08 16:13:02', '2026-02-08 16:13:02');
INSERT INTO "public"."logs" VALUES (60, 'admin@gmail.com', 'Eliminación en calendario: Mantenimiento Sala de Baterias', 'calendarios', 6, '2026-02-08 16:13:15', '2026-02-08 16:13:15');
INSERT INTO "public"."logs" VALUES (61, 'admin@gmail.com', 'Registro en calendario: Mantenimiento Sala de Baterias', 'calendarios', 7, '2026-02-08 16:13:59', '2026-02-08 16:13:59');
INSERT INTO "public"."logs" VALUES (62, 'admin@gmail.com', 'Edición de Tema de Foro: ID 1', 'temasforos', 1, '2026-02-08 16:15:59', '2026-02-08 16:15:59');
INSERT INTO "public"."logs" VALUES (63, 'admin@gmail.com', 'Registro en calendario: Prueba', 'calendarios', 8, '2026-02-08 16:17:16', '2026-02-08 16:17:16');
INSERT INTO "public"."logs" VALUES (64, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 16:23:00', '2026-02-08 16:23:00');
INSERT INTO "public"."logs" VALUES (65, 'admin@gmail.com', 'Deshabilitó al usuario maximo@gmail.com', 'users', 2, '2026-02-08 16:29:12', '2026-02-08 16:29:12');
INSERT INTO "public"."logs" VALUES (66, 'admin@gmail.com', 'Habilitó al usuario maximo@gmail.com', 'users', 2, '2026-02-08 16:29:17', '2026-02-08 16:29:17');
INSERT INTO "public"."logs" VALUES (67, 'admin@gmail.com', 'Deshabilitó al usuario maximo@gmail.com', 'users', 2, '2026-02-08 16:29:27', '2026-02-08 16:29:27');
INSERT INTO "public"."logs" VALUES (68, 'admin@gmail.com', 'Habilitó al usuario maximo@gmail.com', 'users', 2, '2026-02-08 16:31:43', '2026-02-08 16:31:43');
INSERT INTO "public"."logs" VALUES (69, 'admin@gmail.com', 'Registro de Comentario en Tema ID: 2', 'comentariosforos', 2, '2026-02-08 16:32:57', '2026-02-08 16:32:57');
INSERT INTO "public"."logs" VALUES (70, 'admin@gmail.com', 'Edición en calendario: ID 7', 'calendarios', 7, '2026-02-08 16:33:56', '2026-02-08 16:33:56');
INSERT INTO "public"."logs" VALUES (71, 'admin@gmail.com', 'Edición en calendario: ID 7', 'calendarios', 7, '2026-02-08 16:34:05', '2026-02-08 16:34:05');
INSERT INTO "public"."logs" VALUES (72, 'admin@gmail.com', 'Eliminación en calendario: Mantenimiento Sala de Baterias', 'calendarios', 7, '2026-02-08 16:34:11', '2026-02-08 16:34:11');
INSERT INTO "public"."logs" VALUES (73, 'admin@gmail.com', 'Deshabilitó al usuario visita@gmail.com', 'users', 5, '2026-02-08 16:35:14', '2026-02-08 16:35:14');
INSERT INTO "public"."logs" VALUES (74, 'admin@gmail.com', 'Habilitó al usuario visita@gmail.com', 'users', 5, '2026-02-08 16:35:22', '2026-02-08 16:35:22');
INSERT INTO "public"."logs" VALUES (75, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-08 16:36:53', '2026-02-08 16:36:53');
INSERT INTO "public"."logs" VALUES (76, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 16:38:49', '2026-02-08 16:38:49');
INSERT INTO "public"."logs" VALUES (77, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-08 16:40:11', '2026-02-08 16:40:11');
INSERT INTO "public"."logs" VALUES (78, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 18:16:52', '2026-02-08 18:16:52');
INSERT INTO "public"."logs" VALUES (79, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-08 18:16:56', '2026-02-08 18:16:56');
INSERT INTO "public"."logs" VALUES (80, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 18:53:53', '2026-02-08 18:53:53');
INSERT INTO "public"."logs" VALUES (81, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-08 18:56:41', '2026-02-08 18:56:41');
INSERT INTO "public"."logs" VALUES (82, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 19:11:45', '2026-02-08 19:11:45');
INSERT INTO "public"."logs" VALUES (83, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 20:38:58', '2026-02-08 20:38:58');
INSERT INTO "public"."logs" VALUES (84, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-08 20:39:03', '2026-02-08 20:39:03');
INSERT INTO "public"."logs" VALUES (85, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 20:39:44', '2026-02-08 20:39:44');
INSERT INTO "public"."logs" VALUES (86, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 20:48:31', '2026-02-08 20:48:31');
INSERT INTO "public"."logs" VALUES (87, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 20:50:36', '2026-02-08 20:50:36');
INSERT INTO "public"."logs" VALUES (88, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-08 21:12:59', '2026-02-08 21:12:59');
INSERT INTO "public"."logs" VALUES (89, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 21:13:21', '2026-02-08 21:13:21');
INSERT INTO "public"."logs" VALUES (90, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-08 21:13:28', '2026-02-08 21:13:28');
INSERT INTO "public"."logs" VALUES (91, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 21:13:50', '2026-02-08 21:13:50');
INSERT INTO "public"."logs" VALUES (92, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-08 21:45:08', '2026-02-08 21:45:08');
INSERT INTO "public"."logs" VALUES (93, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-08 22:06:20', '2026-02-08 22:06:20');
INSERT INTO "public"."logs" VALUES (94, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-13 17:28:30', '2026-02-13 17:28:30');
INSERT INTO "public"."logs" VALUES (95, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-13 19:28:33', '2026-02-13 19:28:33');
INSERT INTO "public"."logs" VALUES (96, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-13 19:43:57', '2026-02-13 19:43:57');
INSERT INTO "public"."logs" VALUES (97, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-13 19:50:48', '2026-02-13 19:50:48');
INSERT INTO "public"."logs" VALUES (98, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-13 19:50:59', '2026-02-13 19:50:59');
INSERT INTO "public"."logs" VALUES (99, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-13 19:55:59', '2026-02-13 19:55:59');
INSERT INTO "public"."logs" VALUES (100, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-13 20:01:24', '2026-02-13 20:01:24');
INSERT INTO "public"."logs" VALUES (101, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-13 20:01:37', '2026-02-13 20:01:37');
INSERT INTO "public"."logs" VALUES (102, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-13 20:08:19', '2026-02-13 20:08:19');
INSERT INTO "public"."logs" VALUES (103, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-13 20:29:58', '2026-02-13 20:29:58');
INSERT INTO "public"."logs" VALUES (104, 'admin@gmail.com', 'Registro de Blog: Prueba1', 'blogs', 3, '2026-02-13 20:48:21', '2026-02-13 20:48:21');
INSERT INTO "public"."logs" VALUES (105, 'admin@gmail.com', 'Registro de Blog: Prueba2', 'blogs', 4, '2026-02-13 20:48:36', '2026-02-13 20:48:36');
INSERT INTO "public"."logs" VALUES (106, 'admin@gmail.com', 'Registro de Blog: Prueba3', 'blogs', 5, '2026-02-13 20:49:08', '2026-02-13 20:49:08');
INSERT INTO "public"."logs" VALUES (107, 'admin@gmail.com', 'Registro de Blog: Prueba4', 'blogs', 6, '2026-02-13 20:49:19', '2026-02-13 20:49:19');
INSERT INTO "public"."logs" VALUES (108, 'admin@gmail.com', 'Registro de Blog: Prueba5', 'blogs', 7, '2026-02-13 20:51:33', '2026-02-13 20:51:33');
INSERT INTO "public"."logs" VALUES (109, 'admin@gmail.com', 'Registro de Tema de Foro: Prueba1', 'temasforos', 3, '2026-02-13 20:54:50', '2026-02-13 20:54:50');
INSERT INTO "public"."logs" VALUES (110, 'admin@gmail.com', 'Registro de Tema de Foro: Prueba2', 'temasforos', 4, '2026-02-13 20:54:58', '2026-02-13 20:54:58');
INSERT INTO "public"."logs" VALUES (111, 'admin@gmail.com', 'Registro de Tema de Foro: Prueba3', 'temasforos', 5, '2026-02-13 20:55:11', '2026-02-13 20:55:11');
INSERT INTO "public"."logs" VALUES (112, 'admin@gmail.com', 'Registro en calendario: Mantenimiento Sala de Pruebas', 'calendarios', 9, '2026-02-13 22:27:59', '2026-02-13 22:27:59');
INSERT INTO "public"."logs" VALUES (113, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-13 23:17:28', '2026-02-13 23:17:28');
INSERT INTO "public"."logs" VALUES (114, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-13 23:17:40', '2026-02-13 23:17:40');
INSERT INTO "public"."logs" VALUES (115, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-14 11:14:27', '2026-02-14 11:14:27');
INSERT INTO "public"."logs" VALUES (116, 'admin@gmail.com', 'Creado documento: Prueba1', 'documento', 4, '2026-02-14 11:21:15', '2026-02-14 11:21:15');
INSERT INTO "public"."logs" VALUES (117, 'admin@gmail.com', 'Creado documento: Prueba 2', 'documento', 5, '2026-02-14 11:21:41', '2026-02-14 11:21:41');
INSERT INTO "public"."logs" VALUES (118, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-14 11:28:52', '2026-02-14 11:28:52');
INSERT INTO "public"."logs" VALUES (119, 'admin@gmail.com', 'Registro de usuario: prueba1@gmail.com, rol: 3', 'users', 6, '2026-02-14 11:40:40', '2026-02-14 11:40:40');
INSERT INTO "public"."logs" VALUES (120, 'admin@gmail.com', 'Registro de usuario: prueba2@gmail.com, rol: 3', 'users', 7, '2026-02-14 11:41:11', '2026-02-14 11:41:11');
INSERT INTO "public"."logs" VALUES (121, 'admin@gmail.com', 'Registro de usuario: prueba3@gmail.com, rol: 3', 'users', 8, '2026-02-14 11:41:45', '2026-02-14 11:41:45');
INSERT INTO "public"."logs" VALUES (122, 'admin@gmail.com', 'Registro de usuario: prueba4@gmail.com, rol: 3', 'users', 9, '2026-02-14 11:42:14', '2026-02-14 11:42:14');
INSERT INTO "public"."logs" VALUES (123, 'admin@gmail.com', 'Editado documento ID: 3. Se cambió archivo: NO', 'documento', 3, '2026-02-14 12:31:36', '2026-02-14 12:31:36');
INSERT INTO "public"."logs" VALUES (124, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-14 12:56:11', '2026-02-14 12:56:11');
INSERT INTO "public"."logs" VALUES (125, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-14 12:57:20', '2026-02-14 12:57:20');
INSERT INTO "public"."logs" VALUES (126, 'admin@gmail.com', 'Deshabilitó al usuario prueba1@gmail.com', 'users', 6, '2026-02-14 13:04:54', '2026-02-14 13:04:54');
INSERT INTO "public"."logs" VALUES (127, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-14 13:11:54', '2026-02-14 13:11:54');
INSERT INTO "public"."logs" VALUES (128, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-14 13:12:59', '2026-02-14 13:12:59');
INSERT INTO "public"."logs" VALUES (129, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 11:42:03', '2026-02-16 11:42:03');
INSERT INTO "public"."logs" VALUES (130, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 13:05:20', '2026-02-16 13:05:20');
INSERT INTO "public"."logs" VALUES (131, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 13:29:06', '2026-02-16 13:29:06');
INSERT INTO "public"."logs" VALUES (132, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 15:31:50', '2026-02-16 15:31:50');
INSERT INTO "public"."logs" VALUES (133, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 15:32:48', '2026-02-16 15:32:48');
INSERT INTO "public"."logs" VALUES (134, 'admin@gmail.com', 'Edición de Blog: ID 3 - Prueba1', 'blogs', 3, '2026-02-16 15:33:05', '2026-02-16 15:33:05');
INSERT INTO "public"."logs" VALUES (135, 'admin@gmail.com', 'Creado documento: Prueba', 'documento', 6, '2026-02-16 15:38:28', '2026-02-16 15:38:28');
INSERT INTO "public"."logs" VALUES (136, 'admin@gmail.com', 'Edición de Tema de Foro: ID 2', 'temasforos', 2, '2026-02-16 15:42:26', '2026-02-16 15:42:26');
INSERT INTO "public"."logs" VALUES (137, 'admin@gmail.com', 'Registro en calendario: Probando', 'calendarios', 10, '2026-02-16 15:51:36', '2026-02-16 15:51:36');
INSERT INTO "public"."logs" VALUES (138, 'admin@gmail.com', 'Eliminado documento y archivo físico: Prueba1', 'documento', 4, '2026-02-16 16:04:40', '2026-02-16 16:04:40');
INSERT INTO "public"."logs" VALUES (139, 'admin@gmail.com', 'Edición de Blog: ID 1 - Degradación crítica de señal en Banda Ku - Camatagua', 'blogs', 1, '2026-02-16 16:05:56', '2026-02-16 16:05:56');
INSERT INTO "public"."logs" VALUES (140, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 17:54:19', '2026-02-16 17:54:19');
INSERT INTO "public"."logs" VALUES (141, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 17:56:01', '2026-02-16 17:56:01');
INSERT INTO "public"."logs" VALUES (142, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-16 18:01:22', '2026-02-16 18:01:22');
INSERT INTO "public"."logs" VALUES (143, 'admin@gmail.com', 'Login fallido: contraseña incorrecta', 'users', 1, '2026-02-16 18:02:16', '2026-02-16 18:02:16');
INSERT INTO "public"."logs" VALUES (144, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 18:02:24', '2026-02-16 18:02:24');
INSERT INTO "public"."logs" VALUES (145, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-16 18:14:53', '2026-02-16 18:14:53');
INSERT INTO "public"."logs" VALUES (146, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 18:15:52', '2026-02-16 18:15:52');
INSERT INTO "public"."logs" VALUES (147, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 18:18:26', '2026-02-16 18:18:26');
INSERT INTO "public"."logs" VALUES (148, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 18:44:57', '2026-02-16 18:44:57');
INSERT INTO "public"."logs" VALUES (149, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 19:02:39', '2026-02-16 19:02:39');
INSERT INTO "public"."logs" VALUES (150, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 19:04:05', '2026-02-16 19:04:05');
INSERT INTO "public"."logs" VALUES (151, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 19:35:55', '2026-02-16 19:35:55');
INSERT INTO "public"."logs" VALUES (152, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 19:37:08', '2026-02-16 19:37:08');
INSERT INTO "public"."logs" VALUES (153, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 21:32:56', '2026-02-16 21:32:56');
INSERT INTO "public"."logs" VALUES (154, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-16 21:40:53', '2026-02-16 21:40:53');
INSERT INTO "public"."logs" VALUES (155, 'admin@gmail.com', 'Login fallido: contraseña incorrecta', 'users', 1, '2026-02-16 21:41:06', '2026-02-16 21:41:06');
INSERT INTO "public"."logs" VALUES (156, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 21:41:12', '2026-02-16 21:41:12');
INSERT INTO "public"."logs" VALUES (157, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 21:48:03', '2026-02-16 21:48:03');
INSERT INTO "public"."logs" VALUES (158, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 21:53:24', '2026-02-16 21:53:24');
INSERT INTO "public"."logs" VALUES (159, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 21:54:46', '2026-02-16 21:54:46');
INSERT INTO "public"."logs" VALUES (160, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-16 22:03:55', '2026-02-16 22:03:55');
INSERT INTO "public"."logs" VALUES (161, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 22:04:05', '2026-02-16 22:04:05');
INSERT INTO "public"."logs" VALUES (162, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-16 22:13:40', '2026-02-16 22:13:40');
INSERT INTO "public"."logs" VALUES (163, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 22:13:48', '2026-02-16 22:13:48');
INSERT INTO "public"."logs" VALUES (164, 'admin@gmail.com', 'Cambio su contraseña', 'users', 1, '2026-02-16 22:14:21', '2026-02-16 22:14:21');
INSERT INTO "public"."logs" VALUES (165, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 22:17:24', '2026-02-16 22:17:24');
INSERT INTO "public"."logs" VALUES (166, 'admin@gmail.com', 'Cambio su contraseña', 'users', 1, '2026-02-16 22:21:47', '2026-02-16 22:21:47');
INSERT INTO "public"."logs" VALUES (167, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-16 22:21:54', '2026-02-16 22:21:54');
INSERT INTO "public"."logs" VALUES (168, 'admin@gmail.com', 'Login exitoso', 'users', 1, '2026-02-16 22:22:04', '2026-02-16 22:22:04');
INSERT INTO "public"."logs" VALUES (169, 'admin@gmail.com', 'Logout', 'users', 1, '2026-02-16 22:27:32', '2026-02-16 22:27:32');

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
INSERT INTO "public"."migrations" VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO "public"."migrations" VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO "public"."migrations" VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO "public"."migrations" VALUES (4, '2025_12_06_143851_create_personal_access_tokens_table', 1);
INSERT INTO "public"."migrations" VALUES (5, '2025_12_07_135007_create_rol_table', 1);
INSERT INTO "public"."migrations" VALUES (6, '2025_12_07_145454_create_logs_table', 1);
INSERT INTO "public"."migrations" VALUES (7, '2026_01_17_103224_create_categoriadocs_table', 1);
INSERT INTO "public"."migrations" VALUES (8, '2026_01_17_125631_create_documentos_table', 1);
INSERT INTO "public"."migrations" VALUES (9, '2026_01_17_180327_create_blogs_table', 1);
INSERT INTO "public"."migrations" VALUES (10, '2026_01_17_182243_create_calendarios_table', 1);
INSERT INTO "public"."migrations" VALUES (11, '2026_01_18_170347_create_temasforos_table', 1);
INSERT INTO "public"."migrations" VALUES (12, '2026_01_18_204208_create_comentariosforos_table', 1);

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
INSERT INTO "public"."rol" VALUES (1, 'Admin', NULL, NULL);
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
INSERT INTO "public"."temasforos" VALUES (1, 1, 'ERROR: Código de falla E-401 en modulador de Baemari', 'Cerrado', '2026-02-06 20:21:21', '2026-02-08 16:15:59');
INSERT INTO "public"."temasforos" VALUES (3, 1, 'Prueba1', 'Abierto', '2026-02-13 20:54:50', '2026-02-13 20:54:50');
INSERT INTO "public"."temasforos" VALUES (4, 1, 'Prueba2', 'Abierto', '2026-02-13 20:54:58', '2026-02-13 20:54:58');
INSERT INTO "public"."temasforos" VALUES (5, 1, 'Prueba3', 'Abierto', '2026-02-13 20:55:11', '2026-02-13 20:55:11');
INSERT INTO "public"."temasforos" VALUES (2, 1, 'Consulta sobre compatibilidad de firmware v2.5 con equipos de monitoreo', 'Cerrado', '2026-02-08 14:43:01', '2026-02-16 15:42:26');

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
INSERT INTO "public"."users" VALUES (3, 2, 'super@gmail.com', '$2y$12$/1F6yOX/01mbHa/EvzRcp.tMMGlHpALUyV31bFkyuYT1Y4b4Rq5Gm', 'Marco Aurelio', 'CANTV Camatagua', 't', NULL, NULL, '2026-02-06 21:01:51', '2026-02-06 21:01:51');
INSERT INTO "public"."users" VALUES (4, 3, 'opera@gmail.com', '$2y$12$zTOBHQuYyt.UTrTyriF33eNIEhKwGmRV7beV47RBXsdPTpTJysZdO', 'El senador Graco', 'CANTV Baemari', 't', NULL, NULL, '2026-02-06 21:02:50', '2026-02-06 21:02:50');
INSERT INTO "public"."users" VALUES (2, 1, 'maximo@gmail.com', '$2y$12$tQbX7eB0iHyHliZarDbiIOQXyqEuLqy.iZPe9r94.nv9XVcJXjoMu', 'Máximo Décimo Meridio', 'CANTV Av Libertador', 't', NULL, NULL, '2026-02-06 21:00:40', '2026-02-08 16:31:43');
INSERT INTO "public"."users" VALUES (5, 4, 'visita@gmail.com', '$2y$12$M8Ebsih3CkgsEqSL2UZ3BeFEDfPpRHdDGV5lruwYUahJuAipHdxK.', 'Gaio', 'CANTV Administrativo', 't', NULL, NULL, '2026-02-06 21:03:54', '2026-02-08 16:35:22');
INSERT INTO "public"."users" VALUES (7, 3, 'prueba2@gmail.com', '$2y$12$E72RkYp5eIKc66zHGvluteEdUBMxEzZOPPH2U6gCWfb.HJlZF/6.q', 'prueba2', 'Camatagua', 't', NULL, NULL, '2026-02-14 11:41:11', '2026-02-14 11:41:11');
INSERT INTO "public"."users" VALUES (8, 3, 'prueba3@gmail.com', '$2y$12$zpaNb8cs4OzOPUPdEQSX7uWD1JbWSXd1JAupe4w.gf0AgQ2krjbmW', 'prueba3', 'Caracas 3', 't', NULL, NULL, '2026-02-14 11:41:45', '2026-02-14 11:41:45');
INSERT INTO "public"."users" VALUES (9, 3, 'prueba4@gmail.com', '$2y$12$ZbEyj11ogsBj/A/t6MLkL.KwaHE0Kz17whUkh9Hspa.7zDXcmiZNK', 'prueba4', 'Caracas 3', 't', NULL, NULL, '2026-02-14 11:42:14', '2026-02-14 11:42:14');
INSERT INTO "public"."users" VALUES (6, 3, 'prueba1@gmail.com', '$2y$12$otdFUlFI4MgQe1tTVjH0Oe.wXp4C0R3geSxu.YYTPAPB9y6JFDgQK', 'prueba1', 'Caracas', 'f', NULL, NULL, '2026-02-14 11:40:40', '2026-02-14 13:04:54');
INSERT INTO "public"."users" VALUES (1, 1, 'admin@gmail.com', '$2y$12$GgrYsYBtDboZJkFwH8XfPOJOQtm2LtCBqTCrG/kAbGQjGW7vrNYNC', 'Administrador', 'Artigas', 't', NULL, NULL, '2026-02-06 18:13:35', '2026-02-16 22:21:47');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."blogs_id_seq"
OWNED BY "public"."blogs"."id";
SELECT setval('"public"."blogs_id_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."calendarios_id_seq"
OWNED BY "public"."calendarios"."id";
SELECT setval('"public"."calendarios_id_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."categoriadocs_id_seq"
OWNED BY "public"."categoriadocs"."id";
SELECT setval('"public"."categoriadocs_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."comentariosforos_id_seq"
OWNED BY "public"."comentariosforos"."id";
SELECT setval('"public"."comentariosforos_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."documentos_id_seq"
OWNED BY "public"."documentos"."id";
SELECT setval('"public"."documentos_id_seq"', 6, true);

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
SELECT setval('"public"."logs_id_seq"', 169, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."migrations_id_seq"
OWNED BY "public"."migrations"."id";
SELECT setval('"public"."migrations_id_seq"', 12, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."personal_access_tokens_id_seq"
OWNED BY "public"."personal_access_tokens"."id";
SELECT setval('"public"."personal_access_tokens_id_seq"', 77, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."rol_id_seq"
OWNED BY "public"."rol"."id";
SELECT setval('"public"."rol_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."temasforos_id_seq"
OWNED BY "public"."temasforos"."id";
SELECT setval('"public"."temasforos_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 9, true);

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
