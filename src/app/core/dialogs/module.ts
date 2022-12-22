import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

// locals
import { MaterialModule } from '@core/modules/material.module';
import { dialogs } from '@core/dialogs';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [CommonModule, MaterialModule, ...dialogs],
  declarations: [...dialogs],
})
export class SharedDialogsModule {}
