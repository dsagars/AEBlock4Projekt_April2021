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
import { ReactiveFormsModule } from '@angular/forms';

// verschiedenen Module die wir benutzen wollen, importerien wir hier herein, um sie danach überall verfügbar zu haben
// Besonders für Module die wir überall brauchen

@NgModule({
  declarations: [NavbarComponent, ModalComponent, OfferFormComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    OfferFormComponent,
    ModalComponent,
    NavbarComponent,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
