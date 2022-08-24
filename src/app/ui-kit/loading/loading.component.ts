import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

/**
 * Componente que controla el despliegue del modal de carga.
 *
 * @author Manuel Romero
 * @version 1.0
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  /**
   * Atributo que gatilla el despliegue del modal de carga, si es mayor a cero.
   */
  show = 0;

  /**
   * Suscripcion que escucha los cambios de estado.
   */
  private subscription!: Subscription;

  /**
   * Constructor.
   * @constructor
   * @param loadingService Servicio que escucha los cambios de estado.
   */
  constructor(private loadingService: LoadingService) {}

  /**
   * Funcion de inicio del componente que suscribe para escuchar cambios de estado.
   */
  ngOnInit(): void {
    this.subscription = this.loadingService.loadingState.subscribe((state) => {
      this.show = state;
    });
  }

  /**
   * Funcion de termino del componente termina la suscripcion al servicio.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
