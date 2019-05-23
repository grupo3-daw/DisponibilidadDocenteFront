import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@material';
import { ToolbarComponent } from './toolbar.component'
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [ CommonModule,FlexLayoutModule, MaterialModule ],
    exports: [ToolbarComponent],
    providers: []
})
export class ToolbarSharedModule {}