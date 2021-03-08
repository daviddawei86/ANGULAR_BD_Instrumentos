import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`

  .container{
    margin: 10px;
  }

  .mat-toolbar {
  background: maroon;  
}
  
  `]
})

export class HomeComponent {

  public imgUrl = '';

  public usuario: Usuario;

  
  constructor( public usuarioService: UsuarioService,
               private router : Router, 
               private adminGuard: AdminGuard            
     ) { 
 this.imgUrl = usuarioService.usuario.imagenUrl;
  //Es un get no hace falta poner las llaves
  this.usuario = usuarioService.usuario;

 
 
     }

     logout() {

      this.usuarioService.logout();
      
    }

    

    buscar(termino: string){  

      if( termino.length === 0){
  
        this.router.navigateByUrl('/valvulas');
  
      }
  
      this.router.navigateByUrl(`/valvulas/buscar/${ termino }`);
    }
}
