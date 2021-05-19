import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalComponent } from './components/modal/modal.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';

import { CarouselComponent } from './components/carousel/carousel.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// verschiedenen Module die wir benutzen wollen, importerien wir hier herein, um sie danach überall verfügbar zu haben
// Besonders für Module die wir überall brauchen

@NgModule({
  declarations: [
    NavbarComponent,
    ModalComponent,
    OfferFormComponent,
    CarouselComponent,
  ],
  imports: [
    MatDividerModule,
    MatMenuModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCarouselModule.forRoot(),
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
  ],
  exports: [
    MatDividerModule,
    MatMenuModule,
    OfferFormComponent,
    ModalComponent,
    NavbarComponent,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CarouselComponent,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
