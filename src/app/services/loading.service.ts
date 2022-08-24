import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Services that handle the loading modal of the app.
 *
 * @author Manuel Romero
 * @version 1.0
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  /**
   * Observable of the state.
   */
  loadingState: Observable<number>;

  /**
   * Subject.
   */
  private loadingSubject = new BehaviorSubject<number>(0);

  /**
   * Constructor of the class.
   * @constructor
   */
  constructor() {
    this.loadingState = this.loadingSubject.asObservable();
  }

  /**
   * Method that show loading modal.
   */
  show(): void {
    this.loadingSubject.next(this.loadingSubject.getValue() + 1);
  }

  /**
   * Method that hide the loading modal.
   */
  hide(): void {
    const currentValue = this.loadingSubject.getValue();
    if (currentValue > 0) {
      this.loadingSubject.next(this.loadingSubject.getValue() - 1);
    }
  }

  /**
   * Method that reset the counter of the loading modal.
   */
  reset(): void {
    this.loadingSubject.next(0);
  }
}
