import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarComponent } from './pages/buscar/buscar.component';

import { HomeComponent } from './pages/home/home.component';

import { ValvulasRoutingModule } from './valvulas-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { ValvulaComponent } from './pages/mantenimientos/valvulas/valvula.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { ListadoComponent } from './pages/mantenimientos/valvulas/listado.component';










@NgModule({
  declarations: [BuscarComponent, ValvulaComponent, HomeComponent, ListadoComponent, PerfilComponent,  UsuariosComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ValvulasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    PipesModule,
   

  ],
  exports: [
    
  ],
})
export class ValvulasModule { }
