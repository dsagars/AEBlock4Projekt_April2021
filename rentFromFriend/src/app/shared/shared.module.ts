import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';

import { CarouselComponent } from './components/carousel/carousel.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { OfferSearchCardComponent } from './components/offer-search-card/offer-search-card.component';

// verschiedenen Module die wir benutzen wollen, importerien wir hier herein, um sie danach überall verfügbar zu haben
// Besonders für Module die wir überall brauchen

@NgModule({
  declarations: [
    NavbarComponent,
    ModalComponent,
    OfferFormComponent,
    CarouselComponent,
    OfferSearchCardComponent
  ],
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
    MaterialModule,
    OfferSearchCardComponent
  ],
})
export class SharedModule {}
