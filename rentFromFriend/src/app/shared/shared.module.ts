import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';

import { CarouselComponent } from './components/carousel/carousel.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

// verschiedenen Module die wir benutzen wollen, importerien wir hier herein, um sie danach überall verfügbar zu haben
// Besonders für Module die wir überall brauchen

@NgModule({
  declarations: [NavbarComponent, ModalComponent, OfferFormComponent, CarouselComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCarouselModule.forRoot(),
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    OfferFormComponent,
    ModalComponent,
    NavbarComponent,
    CarouselComponent,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatCarouselModule,
    MaterialModule
  ],
})
export class SharedModule { }
