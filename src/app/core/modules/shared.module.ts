import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

import { SharedDialogsModule } from '@core/dialogs/module';
import { SharedComponentsModule } from '@core/components/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MaterialModule,
    SharedDialogsModule,
    SharedComponentsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MaterialModule,
    SharedDialogsModule,
    SharedComponentsModule,
  ],
  declarations: [],
})
export class SharedModule {}
