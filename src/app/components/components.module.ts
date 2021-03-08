import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [ModalImagenComponent, FooterComponent],
  exports: [
    ModalImagenComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
  ]
})
export class ComponentsModule { }
