import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as uuid from 'uuid';
import { CarModel } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  /**
   * Array that handles the data of car list.
   */
  dataCarsFake: CarModel[] = [];

  /**
   * Constructor of the component
   */
  constructor() {}

  /**
   * Method that obtain List of cars.
   */
  getAllCars(): Observable<any> {
    return of(this.dataCarsFake).pipe(delay(2000));
  }

  /**
   * Method that creates a car according to the data received.
   * @param request data required to create a car item.
   */
  public createCar(request: CarModel): Observable<any> {
    const newId = uuid.v4();
    const newDate = new Date();
    request.id = newId;
    request.date = newDate;
    this.dataCarsFake.push(request);
    return of(this.dataCarsFake).pipe(delay(2000));
  }

  /**
   * Method that deletes a specific car by id
   * @param id car identifier
   */
  public deleteCar(id: string): Observable<any> {
    this.dataCarsFake = this.dataCarsFake.filter((item) => item.id !== id);
    return of(this.dataCarsFake).pipe(delay(1000));
  }

  /**
   * Envia los datos para crear auto
   * @param formulario datos para agendamiento.
   */
  public editCar(formulario: CarModel, id: string): Observable<any> {
    this.dataCarsFake.forEach((element) => {
      if (element.id === id) {
        element.color = formulario.color;
        element.image = formulario.image;
        element.patent = formulario.patent;
        element.price = formulario.price;
        element.brand = formulario.brand;
        element.model = formulario.model;
      }
    });

    return of(this.dataCarsFake).pipe(delay(2000));
  }
}
