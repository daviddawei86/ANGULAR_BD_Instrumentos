import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { YesNoPipe } from './yes-no.pipe';



@NgModule({
  declarations: [ImagenPipe, YesNoPipe],
  exports:[ ImagenPipe, YesNoPipe ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
