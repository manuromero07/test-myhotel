import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/utils/pipes/pipes.module';
import { ModalDeleteCarComponent } from './modal-delete-car/modal-delete-car.component';
import { ModalHandleOptionsCarComponent } from './modal-handle-options-car/modal-handle-options-car.component';
import { NavbarComponent } from './navbar/navbar.component';

const COMPONENTS = [
  NavbarComponent,
  ModalDeleteCarComponent,
  ModalHandleOptionsCarComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PipesModule],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
