import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

/**
 * Component that handles the loading modal.
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  /**
   * Attribute that triggers the loading modal if it's higher than 0.
   */
  show = 0;

  /**
   * Subscription that listen to changes of states
   */
  private subscription!: Subscription;

  /**
   * Constructor of the component.
   * @constructor
   * @param loadingService Service that listen to changes of state
   */
  constructor(private loadingService: LoadingService) {}

  /**
   * Start the component subscription and listen to changes of state
   */
  ngOnInit(): void {
    this.subscription = this.loadingService.loadingState.subscribe((state) => {
      this.show = state;
    });
  }

  /**
   * Method that ends the subscription
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
