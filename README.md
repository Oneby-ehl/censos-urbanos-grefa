# GREFA Censos Urbanos

Aplicación móvil desarrollada para facilitar la recogida de censos de fauna urbana en edificios y entornos urbanos.

El objetivo de la aplicación es permitir la toma rápida de datos en campo, incluso en situaciones de conectividad limitada, simplificando el registro de múltiples especies y mejorando la organización de la información recogida.

---

# Funcionalidades principales

* Registro de censos urbanos desde dispositivo móvil.
* Flujo optimizado para trabajo de campo.
* Registro consecutivo de varias especies en una misma ubicación.
* Funcionamiento offline con almacenamiento local.
* Sincronización posterior cuando vuelve la conexión.
* Opciones dinámicas configurables desde Google Sheets.
* Validación de campos obligatorios.
* Selección múltiple en diferentes campos técnicos.
* Resumen visual antes del envío.
* Gestión local de registros pendientes.
* Navegación táctil mediante swipe entre pantallas.

---

# Tecnologías utilizadas

* Expo
* React Native
* TypeScript
* Google Apps Script
* Google Sheets
* AsyncStorage

---

# Configuración backend

La aplicación utiliza Google Apps Script como backend ligero para:

* Recepción de censos.
* Configuración dinámica de opciones.
* Sincronización de datos.

Las opciones dinámicas se gestionan mediante Google Sheets.

---

# Flujo de uso

## Nuevo censo

Permite iniciar un nuevo registro completamente vacío.

## Registro consecutivo de especies

Tras guardar un censo, la aplicación mantiene automáticamente los datos de ubicación, edificio y contexto para agilizar el registro de nuevas especies observadas en el mismo lugar.

## Finalizar ubicación

Permite limpiar completamente el formulario y volver al inicio para comenzar un nuevo punto de censo.

---

# Filosofía del proyecto

La aplicación ha sido diseñada priorizando:

* Rapidez de uso en campo.
* Simplicidad visual.
* Robustez offline.
* Facilidad de mantenimiento.
* Adaptabilidad futura.

---

# Autoría

Aplicación desarrollada inicialmente por:

**Eduardo Herrera Lorenzo**

para:

**GREFA — Grupo de Rehabilitación de la Fauna Autóctona y su Hábitat**
