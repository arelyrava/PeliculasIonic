# Aplicación de Películas Ionic

> Aplicación desarrollada con Ionic + Angular que permite consultar películas, ver sus detalles y agregarlas a una lista de favoritos.
>Los favoritos se almacenan localmente en el dispositivo utilizando @ionic/storage-angular, y se muestran organizados por género.
  
# Descripción general

> La Aplicación de Películas Ionic es un proyecto que consume una API de películas para mostrar información detallada y organizada.
**El usuario puede:**

- Explorar distintas películas disponibles.

- Ver información completa de una película (géneros, descripción, reparto, etc.).

- Agregar o eliminar películas de su lista de favoritos.

- Visualizar las películas favoritas clasificadas automáticamente por género.

- Navegar fácilmente entre pantallas usando un sistema de tabs de Ionic.

>La aplicación está diseñada principalmente para dispositivos móviles, aunque también puede ejecutarse en navegadores web.

## Tecnologías y dependencias utilizadas
## Frameworks principales:

Ionic Framework

Angular 

## Almacenamiento local:

**@ionic/storage-angular**

> Esta dependencia es clave, ya que el servicio DataLocalService la utiliza para guardar y recuperar las películas favoritas desde el almacenamiento local del dispositivo.


## Otras dependencias relevantes:

- rxjs

- swiper (para el carrusel de películas)

- @angular/common

- @angular/forms

- @angular/core

- @ionic/angular

## Instalación y ejecución local

>Sigue los pasos a continuación para ejecutar el proyecto correctamente:

# Clonar el repositorio
git clone https://github.com/arelyrava/RepositorioPeliculas.git
cd RepositorioPeliculas

# Instalar dependencias
npm install


🔸 **Importante**: asegúrate de instalar también la dependencia del almacenamiento local.
Sin ella, los favoritos no podrán guardarse ni mostrarse correctamente.
-------------------------------------
npm install @ionic/storage-angular
-------------------------------------

# Ejecutar la aplicación en el navegador
ionic serve -o 
> esto abrira el navegador de manera inmediata y mostrara la apliación

en caso de que no se ejecute de manera automatica, abre tu navegador y accede a:
----------------------------------
     http://localhost:8100
----------------------------------

## Estructura del proyecto
src/
├── app/
│   ├── components/        # Componentes reutilizables 
│   ├── services/          # Lógica de negocio 
│   ├── pages/             # Vistas principales 
│   ├── interfaces/        # Interfaces y modelos de datos
│   └── app.module.ts
├── assets/                # Imágenes y recursos estáticos
└── environments/          # Configuración de entorno 


# Funcionamiento técnico
# data-local.service.ts

>Administra las películas favoritas usando @ionic/storage-angular, esta permite agregar, eliminar y verificar si una película está marcada como favorita, como tambien guarda los datos localmente para persistirlos entre sesiones.

# detalle.component.ts

>Muestra la información detallada de una película dentro de un modal. Permite marcar o desmarcar una película como favorita cambia el ícono de estrella estando vacia si no esta en favoritos y llena cuando esta se a marcado, tambien llama al servicio DataLocalService para actualizar el almacenamiento local.

# tab3.page.ts

>Muestra todas las películas guardadas como favoritas, agrupadas por género este usa el método pelisPorGenero() para clasificar las películas según su categoría.
>Implementa un carrusel visual (Swiper) para mostrar los pósters de cada grupo.
