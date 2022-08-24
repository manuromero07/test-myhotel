import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarModel } from '../../models';

@Component({
  selector: 'app-modal-delete-car',
  templateUrl: './modal-delete-car.component.html',
  styleUrls: ['./modal-delete-car.component.scss'],
})
export class ModalDeleteCarComponent implements OnInit {
  /**
   *Data that belongs to te item that will be deleted.
   */
  @Input() carDataModal!: CarModel;

  /**
   * Event emittet that handle if delete modal should be hidden.
   */
  @Output() hideModalDelete = new EventEmitter<boolean>();

  /**
   * Event emitter that handle the action to delete a car.
   */
  @Output() deleteCar = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Method that handle the action of delete an item.
   */
  emitDeleteEvent(): void {
    this.deleteCar.emit();
    this.closeModal();
  }

  /**
   * Method that handle the action of closing modal found.
   */
  closeModal(): void {
    this.hideModalDelete.emit(false);
  }
}
