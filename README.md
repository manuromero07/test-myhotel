# TestMyhotel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

El presente manual indica los pasos necesarios para instalar la aplicación de registro para ser utilizado en el contexto de la realización de este test.

- [Instrucciones de construcción e instalación](#instrucciones-de-construcción-e-instalación)
  - [Instalación paquetes locales (npm)](#instalación-paquetes-locales)
  - [Iniciar el servidor local (ngserve)](#iniciar-el-servidor-local)

### Tecnologías utilizadas

- Formularios:
  - [ReactiveForm](https://angular.io/guide/reactive-forms)
- Navegación;
  - [Angular Router](https://angular.io/guide/router)
  - [LazyLoading](https://angular.io/guide/lazy-loading-ngmodules)
- State Management:
  - [NGXS](https://www.ngxs.io/)
- otras;
  - [Metodologia BEM](http://getbem.com/)
  - [Icomoon](https://icomoon.io/)
  - [RxJs](https://rxjs.dev/)
  - [of](https://rxjs.dev/api/index/function/of)
  - [Pipes](https://angular.io/guide/pipes)

### Servicios simulados con RxJS/of

Se utilizo rxjs/of, para simular la respuesta de un servicio, utilizando el pipe delay, el cual cumple con la simulacion de un tiempo de demora para retornar una respues. A este se le añadio un arreglo vacio, al cual eventualmente se injecta data al momento de crear un item con el servicio createCar() que se encuentra en: `src/app/services/test.service.ts`

### Funcionalidades de la aplicación

Las funcionalidades de la aplicación consisten en un CRUD, el cual permite crear, editar, eliminar y buscar los items creados, en este caso autos.

- Pasos:
  - El primer paso, consiste en crear un item, en el cual la imagen es opcional y debe contener una url existente de una imagen, una vez creado, por medio de la simulación de la llamada del servicio se le asignara un id especifico y una fecha de creación. Tal y como lo manejaria una base de datos real.
  - El siguiente paso puede ser opcional, ya que puedes escoger entre editar el auto creado, utilizar el input de busqueda para realizar una busqueda o eliminar dicho auto.

### Control y validación de formularios con reactiveForm

Se utilizó Reactive Forms para poder manejar el control de inputs, y validando solamente los requeridos, explicando lo necesitado segun el minimo y maximo de caracter y como se menciona anteriormente si el campo es requerido. El mensaje de error aparecera una vez que hayas ejecutado la acción 'submit' o si seleccionaste un campo y no lo editaste, o en todo caso ingresaste incorrectamente el valor solicitado.

### Manejo de store NGXS

Se implemento NGXS, para realizar el uso de almacenamiento de datos en la aplicacion, funciona de manera que a medida que ejecutemos cualquier acción, como por ejemplo crear un nuevo auto/item, se gatillara una acción 'CrearAuto', la cual sera escuchada por los estados que hemos generado, y procedera a almacenar data en el store designado. Cualquier otra acción como la de editar o eliminar, se vera reflejada en vivo en el store.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
