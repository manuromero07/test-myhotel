import { CarModel } from '../shared/models';

export class CreateCar {
  static readonly type = '[CarModel] Create car';

  constructor(public payload: CarModel) {}
}

export class GetAllCar {
  static readonly type = '[CarModel] Get all cars';
  constructor() {}
}

export class EditCar {
  static readonly type = '[CarModel] edit a car';

  constructor(public payload: CarModel, public id: string) {}
}

export class DeleteCar {
  static readonly type = '[CarModel] Delete a car';

  constructor(public id: string) {}
}
