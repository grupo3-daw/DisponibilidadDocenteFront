import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@shared/material';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AutenticacionGuard } from './guards/autenticacion.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, MaterialModule, routing],
  bootstrap: [AppComponent],
  providers: [AutenticacionGuard]
})
export class AppModule {}
