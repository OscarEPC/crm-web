# 🅰️ Crm web

> Crm para gestion de tareas

---

## 📋 Requisitos previos

Asegúrate de tener instalado lo siguiente antes de continuar:

| Herramienta | Versión recomendada | Verificar |
|-------------|---------------------|-----------|
| [Node.js](https://nodejs.org/) | >= 18.x | `node -v` |
| [npm](https://www.npmjs.com/) | >= 9.x | `npm -v` |
| [Angular CLI](https://angular.io/cli) | >= 17.x | `ng version` |

Para instalar Angular CLI globalmente:

```bash
npm install -g @angular/cli
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/OscarEPC/crm-web.git
cd crm-web
```

### 2. Instalar dependencias

```bash
npm install
```

## 🖥️ Correr el proyecto

### Servidor de desarrollo

```bash
ng serve
```

La aplicación estará disponible en: **http://localhost:4200**

El servidor se recargará automáticamente al detectar cambios en los archivos fuente.

---

## 📁 Estructura del proyecto

```
nombre-del-proyecto/
├── src/
│   ├── app/
│   │   ├── atuh/            # Servicios singleton, guards, interceptores
│   │   ├── dashboard/          # Componentes, pipes y directivas reutilizables
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/              # Imágenes, fuentes, íconos
│   ├── environments/        # Configuración por entorno
│   └── styles/              # Estilos globales
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 🌐 Variables de entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `apiUrl` | URL base de la API backend | ✅ |
| `production` | Modo producción (`true`/`false`) | ✅ |

---

### Convención de commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/es/):

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` cambios de formato (sin lógica)
- `refactor:` refactorización de código
- `test:` agregar o modificar pruebas

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

## 👤 Autor

**Tu Nombre**
- GitHub: [@OscarEduDev](https://github.com/OscarEduDev.git)
- Email: oscar.edu.dev@gmail.com