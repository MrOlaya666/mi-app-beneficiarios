# 🎓 Sistema de Gestión de Beneficiarios
### Programa de Apoyo Educativo — Bogotá D.C.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![MySQL](https://img.shields.io/badge/MySQL-Railway-blue?style=for-the-badge&logo=mysql)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![GitHub](https://img.shields.io/badge/GitHub-Repositorio-181717?style=for-the-badge&logo=github)

---

## 📋 Descripción del Proyecto

Sistema web desarrollado con **Next.js** y **MySQL** para la gestión y consulta de beneficiarios del programa de apoyo educativo de Bogotá D.C. Permite registrar, consultar, editar y eliminar información de beneficiarios, universidades, localidades y convocatorias, siguiendo una arquitectura **MVC (Modelo - Vista - Controlador)**.

---

## 🗄️ Base de Datos

La base de datos está alojada en **Railway** y cuenta con **15 tablas**:

| Tabla | Descripción |
|---|---|
| `matriz` | Tabla principal con todos los registros de beneficiarios |
| `convocatoria` | Convocatorias del programa (JE1, JE2... JU6) |
| `localidad` | Localidades de Bogotá |
| `universidades` | 59 instituciones de educación superior |
| `nucleo_conocimiento` | Núcleos básicos del conocimiento |
| `modalidad` | Modalidades académicas |
| `sexo` | Género del beneficiario |
| `edad` | Rangos de edad |
| `grupo_etnico` | Grupos étnicos |
| `sisben` | Clasificación Sisbén |
| `victima_conflicto` | Víctima del conflicto armado |
| `discapacidad` | Condición de discapacidad |
| `saber_11` | Percentil Pruebas Saber 11 |
| `zona` | Zona geográfica |
| `sector_colegio` | Sector del colegio de procedencia |

---

## 🏗️ Arquitectura MVC
