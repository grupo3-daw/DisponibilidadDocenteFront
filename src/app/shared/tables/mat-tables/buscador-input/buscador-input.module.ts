import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BuscadorInputComponent } from './buscador-input.component'
import { MaterialFormsModule } from '@material'

@NgModule({
  imports: [CommonModule, MaterialFormsModule],
  declarations: [BuscadorInputComponent],
  exports: [BuscadorInputComponent]
})
export class BuscadorInputModule {}
