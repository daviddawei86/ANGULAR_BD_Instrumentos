import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarComponent } from './pages/buscar/buscar.component';

import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ValvulaComponent } from './pages/mantenimientos/valvulas/valvula.component';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { ListadoComponent } from './pages/mantenimientos/valvulas/listado.component';
import { AdminGuard } from '../guards/admin.guard';


const rutas: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[AuthGuard],
    children: [

      
      { path: 'perfil', component: PerfilComponent },
      { path: 'buscar/:termino', component: BuscarComponent },
      
  
      // Mantenimientos
      { path: 'listado', component: ListadoComponent },
      { path: 'valvula/:id', component: ValvulaComponent },

      // Rutas de admin , su hubiera varios guards canActivate: [,,,]
      { path: 'usuarios',canActivate: [AdminGuard],component: UsuariosComponent },


      { path: '**', redirectTo: 'listado' }
    ]
  }
];



@NgModule({
  imports: [
    RouterModule.forChild( rutas )
  ],
  exports: [
    RouterModule
  ]
})
export class ValvulasRoutingModule { }
