import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { MaterialModule } from '@material';

import { BuscadorInputModule } from './buscador-input/buscador-input.module';
import { MatPaginatorIntlCro } from './custom.paginator';
import { MatTableComponent } from './mat-table/mat-table.component';

@NgModule({
  imports: [CommonModule, MaterialModule, BuscadorInputModule],
  declarations: [MatTableComponent],
  exports: [MatTableComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }]
})
export class MaterialTablesModule {}
