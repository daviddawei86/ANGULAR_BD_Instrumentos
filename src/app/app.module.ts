import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';






@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  
   
   
   
  ],
  exports: [
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
