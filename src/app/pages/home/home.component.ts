import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeModalEnum } from 'src/app/enums';
import { LoadingService, TestService } from 'src/app/services';
import { CarModel } from 'src/app/shared/models';
import { ReplaceCurrencyPipe } from 'src/app/utils/pipes/replace-currency.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe, ReplaceCurrencyPipe],
})
export class HomeComponent implements OnInit {
  /**
   * Formulario de autos
   */
  carForm!: FormGroup;

  /**
   * Formulario de buscador
   */
  findForm!: FormGroup;

  /**
   * Variable que indica si fue seleccionado el boton de crear
   */
  isSubmitted!: boolean;

  /**
   * Arreglo de objetos que contiene listado de autos.
   */
  carData: CarModel[] = [];

  /**
   * Data model for modal edit
   */
  editDataModal: CarModel = {
    brand: '',
    model: '',
    color: '',
    image: '',
    patent: '',
    price: 0,
  };

  /**
   * Data model for modal
   */
  carDataModal: CarModel = {
    brand: '',
    color: '',
    model: '',
    price: 0,
    image: '',
    patent: '',
  };

  /**
   * Flag that handle if modal create is visible
   */
  isModalCreate!: boolean;

  /**
   * Flag that handle if modal edit is visible
   */
  isModalEdit!: boolean;

  /**
   * Flag that handle if modal delete is visible
   */
  showModalDelete: boolean;

  /**
   * Array that contains the data filtered
   */
  carDataFiltered: CarModel[] = [];

  /**
   * Constructor del componente
   * @param carService servicio de autos
   */
  constructor(
    private carService: TestService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService
  ) {
    this.initializeSearchform();
    this.inicializarcarForm();
    this.isModalCreate = false;
    this.showModalDelete = false;
    this.isModalEdit = false;
  }

  ngOnInit(): void {
    this.getCarList();
  }

  /**
   * Método que inicializa el formulario de tasación
   */
  inicializarcarForm(): void {
    this.carForm = this.formBuilder.group({
      patent: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]{4}[0-9]{2}$'),
          Validators.minLength(2),
        ],
      ],
      brand: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'),
          Validators.minLength(2),
        ],
      ],
      model: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'),
          Validators.minLength(2),
        ],
      ],
      price: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.pattern('^([0-9]+$)'),
          Validators.minLength(6),
        ],
      ],
      color: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'),
          Validators.minLength(2),
        ],
      ],
      image: [{ value: null, disabled: false }],
    });
  }

  /**
   * Método que inicializa el formulario de tasación
   */
  initializeSearchform(): void {
    this.findForm = this.formBuilder.group({
      findPatent: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]{4}[0-9]{2}$'),
          Validators.minLength(2),
        ],
      ],
    });
  }

  /**
   * Metodo que obtiene listado de autos.
   */
  getCarList(): void {
    this.carService.getAllCars().subscribe((data) => {
      this.carData = data;
      this.carDataFiltered = data;
    });
  }

  /**
   * Method that subscribe to service create car in order to create a new car item
   */
  createCar(): void {
    const dataCarCreation = new CarModel(
      this.carForm.controls['brand'].value,
      this.carForm.controls['model'].value,
      this.carForm.controls['patent'].value,
      this.carForm.controls['color'].value,
      Number(this.carForm.controls['price'].value),
      this.carForm.controls['image'].value
    );
    this.loadingService.show();
    this.carService.createCar(dataCarCreation).subscribe((resp) => {
      this.loadingService.hide();
      this.getCarList();
    });
  }

  /**
   * Get Method that returns the type modal enum
   */
  public get typeModalEnum(): typeof TypeModalEnum {
    return TypeModalEnum;
  }

  /**
   * Method that handle modal create or edit
   * @param type type of modal to handle
   * @param index position of the interacted element
   */
  showModalHandleOptions(type: string, index?: number): void {
    if (type === TypeModalEnum.CREATE) {
      this.isModalCreate = true;
      this.isModalEdit = false;
    } else {
      this.isModalEdit = true;
      this.isModalCreate = false;
      if (index! >= 0 && index !== undefined) {
        this.handleEditData(index);
      }
    }
  }

  /**
   * Method that save into a model the value of the item selected
   * @param index position of the interacted element
   */
  handleEditData(index: number): void {
    this.editDataModal = new CarModel(
      this.carData[index].brand,
      this.carData[index].model,
      this.carData[index].patent,
      this.carData[index].color,
      this.carData[index].price,
      this.carData[index].image,
      this.carData[index].id
    );
    this.setDataToform();
  }

  /**
   * Method that get the data from the form that is going to be edited.
   */
  setDataToform(): void {
    this.carForm.controls['brand'].setValue(this.editDataModal.brand);
    this.carForm.controls['model'].setValue(this.editDataModal.model);
    this.carForm.controls['patent'].setValue(this.editDataModal.patent);
    this.carForm.controls['price'].setValue(this.editDataModal.price);
    this.carForm.controls['color'].setValue(this.editDataModal.color);
    this.carForm.controls['image'].setValue(this.editDataModal.image);
  }

  /**
   * Method that build request and call the edit car service to edit
   * an specific car
   */
  EditCar(): void {
    const dataCarEdit = new CarModel(
      this.carForm.controls['brand'].value,
      this.carForm.controls['model'].value,
      this.carForm.controls['patent'].value,
      this.carForm.controls['color'].value,
      Number(this.carForm.controls['price'].value),
      this.carForm.controls['image'].value
    );
    this.loadingService.show();
    this.carService
      .editCar(dataCarEdit, String(this.editDataModal.id))
      .subscribe((resp) => {
        this.isModalEdit = false;
        this.getCarList();
        this.loadingService.hide();
      });
  }

  /**
   * Method that handle if modal delete is visible and build the data to show in that
   * modal of the specific car
   * @param $event boolean event that handle if the modal should be visible
   * @param index position of the item selected
   */
  showModalDeleteAutos($event: boolean, index: number): void {
    this.showModalDelete = $event;
    this.carDataModal = new CarModel(
      (this.carDataModal.brand = this.carData[index].brand),
      (this.carDataModal.patent = this.carData[index].patent),
      (this.carDataModal.color = this.carData[index].color),
      (this.carDataModal.model = this.carData[index].model),
      (this.carDataModal.price = this.carData[index].price),
      (this.carDataModal.image = this.carData[index].image),
      (this.carDataModal.id = this.carData[index].id)
    );
  }

  /**
   * Method that calls a service to delete a specific car
   */
  doDeleteCar() {
    this.loadingService.show();
    this.carService
      .deleteCar(String(this.carDataModal.id))
      .subscribe((resp) => {
        this.getCarList();
        this.loadingService.hide();
      });
  }

  /**
   * Method that close the modal create
   * @param $event boolean event that handle if modal create or edit should be hidden
   */
  hideModalCreateEdit($event: boolean): void {
    this.isModalCreate = $event;
    this.isModalEdit = $event;
  }

  /**
   * Method that close the modal delete
   * @param $event boolean event that handle if modal delete should be visible
   */
  hideModalDelete($event: boolean): void {
    this.showModalDelete = $event;
  }

  /**
   * Method that reset the form
   */
  cleanCarForm(): void {
    this.carForm.controls['brand'].setValue('');
    this.carForm.controls['model'].setValue('');
    this.carForm.controls['patent'].setValue('');
    this.carForm.controls['color'].setValue('');
    this.carForm.controls['price'].setValue('');
    this.carForm.reset();
  }

  /**
   * Method that handle the search of the car items created by patent
   * @param event target event when type anything on the input
   */
  searchPatent(event: any) {
    if (event.target.value) {
      this.carDataFiltered = this.carData.filter((item) =>
        item.patent.toLowerCase().includes(event.target.value.toLowerCase())
      );
    } else {
      this.carDataFiltered = this.carData;
    }
  }
}
