import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BaseComponent } from './base.component';

@NgModule({
  declarations: [
    BaseComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [BaseComponent],
})
export class BaseModule { }
