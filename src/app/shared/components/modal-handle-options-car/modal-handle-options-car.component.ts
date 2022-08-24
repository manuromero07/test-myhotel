import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-handle-options-car',
  templateUrl: './modal-handle-options-car.component.html',
  styleUrls: ['./modal-handle-options-car.component.scss'],
})
export class ModalHandleOptionsCarComponent implements OnInit {
  /**
   * Car form
   */
  @Input() carForm!: FormGroup;

  /**
   * Flag that verifies if button has been submitted
   */
  isSubmitted!: boolean;

  /**
   * Flag that handles if the modal should show the edit form
   */
  @Input() isModalEdit!: boolean;

  /**
   * Flag that handles if modal should be visible.
   */
  @Input() isModalCreate!: boolean;

  /**
   * Event emitter that handles if modal should be hidden
   */
  @Output() hideModal = new EventEmitter<boolean>();

  /**
   * Event emitter that handles the reset of the form
   */
  @Output() cleanForm = new EventEmitter<any>();
  /**
   * Event emitter that handle the creation of a car item
   */
  @Output() createCarLog = new EventEmitter<any>();

  /**
   * Event emitter that handles if car should be edited
   */
  @Output() editCar = new EventEmitter<any>();

  /**
   * Event emitter that handle img of the car
   */
  @Output() handleImg = new EventEmitter<any>();

  /**
   * Constructor of the component
   */
  constructor() {
    this.isSubmitted = false;
    this.isModalEdit = false;
    this.isModalCreate = false;
  }

  ngOnInit(): void {}

  /**
   * Method that handle the creation of a car item on button submit
   */
  createCar(): void {
    this.isSubmitted = true;
    if (this.carForm.invalid) {
      return;
    } else {
      this.createCarLog.emit();
      this.closeModal();
    }
  }

  /**
   * method that handles the edition of the car form
   */
  editAuto(): void {
    this.isSubmitted = true;
    if (this.carForm.invalid) {
      return;
    } else {
      this.isModalEdit = true;
      this.editCar.emit();
      this.closeModal();
    }
  }

  /**
   * Method that cleans the form
   */
  cleanCarForm(): void {
    this.cleanForm.emit();
  }

  /**
   * Method that handle the event to close the modal
   */
  closeModal(): void {
    this.hideModal.emit(false);
    this.carForm.reset();
  }
}
