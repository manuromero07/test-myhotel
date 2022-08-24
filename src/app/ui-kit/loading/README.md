# Componente Loading

Este es un componente de un conjunto de componentes genéricos el cual permite agregar un modal de carga.

## Estructura componente

El componente tiene la siguiente estructura detallada:

- **/loading**
  - **loading.component.html** Contiene la estructura html del componente.
  - **loading.component.scss** Contiene los estilos.
  - **loading.component.ts** Controla el comportamiento del componente.
  - **/services** Directorio que contiene las funciones que se utilizan dentro del componente.
    - **loading.service.ts** Servicio que controla el despliegue y ocultar el modal.

## Uso

Para controlar el despliegue del modal de carga se realiza a través de servicio expuesto, esto se realiza de la siguiente forma:

app.component.ts

```
export class AppComponent implements OnInit {

    constructor(private loadingService: LoadingService) { }

    mostrarModal(): void {
        this.loadingService.show();
    }

    ocultarModal(): void {
        this.loadingService.hide();
    }
}
```

app.component.html

```
<app-loading></app-loading>
```

### Funciones del servicio de loading

El servicio tiene implementado tres funciones que se detallan a continuación:

- **show()** Despliega el modal de loading, sumando 1 al contador interno.
- **hide()** Resta 1 al contador interno, de ser cero se oculta el modal.
- **reset()** Oculta el modal sin importar el contador y deja el contador interno en cero.

### Como funciona el contador interno

Internamente tiene un contador el cual cada vez que se invoca el despliegue (show) del modal se suma 1 al contador interno y cada ves que se oculta (hide) resta 1 al contador y una vez que sea cero se oculta el modal. Esto se programo de esta manera por en el caso de realizar por ejemplo el llamado a 2 servicios de manera paralela y antes de invocar cada servicio se invoca el despliegue (show) y una vez que llegue la respuesta de cada servicio se oculta (hide). De esta manera el modal de carga no se ocultará hasta que se tenga la respuesta de los dos servicios.
Con la función de reset corta cualquier contador dejandolo en cero nuevamente y ocultando el modal.

A continuación se detalla en código el ejemplo anterior:

```
...
ejemplo(): void {
    // llamado servicio 1.
    this.loadingService.show(); // contandor modal + 1
    this.restClient.servicio1().subscribe(data => {
        this.loadingService.hide(); // contador modal - 1
        // Si el segundo servicio aun no tiene respuesta seguirá el modal en pantalla.
    },
    err => {
        this.loadingService.reset(); // contador modal cero se oculta el modal.
        // Desplegar mensaje de error.
    });

    // llamado servicio 2.
    this.loadingService.show(); // contandor modal + 1
    this.restClient.servicio2().subscribe(data => {
        this.loadingService.hide(); // contador modal - 1
        // Si el primer servicio aun no tiene respuesta seguirá el modal en pantalla.
    },
    err => {
        this.loadingService.reset(); // contador modal cero se oculta el modal.
        // Desplegar mensaje de error.
    });
}
```
