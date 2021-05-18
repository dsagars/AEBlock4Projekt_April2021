import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ModalComponent } from './components/modal/modal.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

// verschiedenen Module die wir benutzen wollen, importerien wir hier herein, um sie danach überall verfügbar zu haben
// Besonders für Module die wir überall brauchen

@NgModule({
  declarations: [NavbarComponent, ModalComponent, OfferFormComponent],
  imports: [
    MatMenuModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatMenuModule,
    RouterModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
  ],
  exports: [
    MatMenuModule,
    OfferFormComponent,
    ModalComponent,
    NavbarComponent,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatTabsModule,
    FormsModule
  ],
})
export class SharedModule { }
