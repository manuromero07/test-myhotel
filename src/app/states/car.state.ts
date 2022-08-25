import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  CreateCar,
  DeleteCar,
  EditCar,
  GetAllCar,
} from '../actions/car.action';
import { CarModel } from '../shared/models';

import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoadingService, TestService } from 'src/app/services';

export class CarStateModel {
  dataCarsFake: CarModel[] = [];
  selectedCar!: null;
}

@State<CarStateModel>({
  name: 'car',
  defaults: {
    dataCarsFake: [],
    selectedCar: null,
  },
})
@Injectable()
export class CarState {
  constructor(
    private testService: TestService,
    private loadingService: LoadingService
  ) {}

  /**
   * Selector that returns the state
   * @param state state car
   * @returns model of the state
   */
  @Selector()
  static getCarList(state: CarStateModel) {
    return state.dataCarsFake;
  }

  /**
   * Action that handles get all items created
   */
  @Action(GetAllCar)
  getAllCars({ getState, setState }: StateContext<CarStateModel>) {
    return this.testService.getAllCars().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          dataCarsFake: result,
        });
      })
    );
  }
  /**
   * Action that handles create a car
   */
  @Action(CreateCar)
  createCar(
    { getState, patchState }: StateContext<CarStateModel>,
    { payload }: CreateCar
  ) {
    return this.testService.createCar(payload).pipe(
      tap((result) => {
        patchState({
          dataCarsFake: result,
        });
      })
    );
  }

  /**
   * Action that edit a car
   */
  @Action(EditCar)
  editCar(
    { getState, patchState }: StateContext<CarStateModel>,
    { payload, id }: EditCar
  ) {
    return this.testService.editCar(payload, id).pipe(
      tap((result) => {
        patchState({
          dataCarsFake: result,
        });
      })
    );
  }

  /**
   * Action thar deletes a car
   */
  @Action(DeleteCar)
  deleteCar(
    { getState, setState }: StateContext<CarStateModel>,
    { id }: DeleteCar
  ) {
    this.loadingService.show();
    return this.testService.deleteCar(String(id)).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.dataCarsFake.filter(
          (item) => item.id !== id
        );
        setState({
          ...state,
          dataCarsFake: filteredArray,
        });
        this.loadingService.hide();
      })
    );
  }
}
