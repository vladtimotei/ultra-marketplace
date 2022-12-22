import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

// locals
import { MaterialModule } from '@core/modules/material.module';
import { components } from '@core/components';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [CommonModule, MaterialModule, ...components],
  declarations: [...components],
})
export class SharedComponentsModule {}
