import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable , of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';


const base_url = environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone  ) { 

    this.googleInit();

   }


   get token(): string {

     return localStorage.getItem('token') || '';
   }

   get role(): 'ADMIN_ROLE' | 'USER_ROLE'  {

    return this.usuario.role;
  }

   get uid(): string {

    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
        }
    }
  }


  adminUsuarios(){
 
    if( this.role== "ADMIN_ROLE"){
      return true;
    }else{
      return false;
    }

  }

googleInit(){

  return new Promise<void>( resolve => {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
      client_id: '248712544273-fi3tmln33b4nf20p37t3dvfi9egpekmp.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',   
    });

    resolve();
  });
})

}

guardarLocalStorage( token: string) {

  localStorage.setItem('token', token );
  

}


  logout() {

    localStorage.removeItem('token');
    
    

    this.auth2.signOut().then(() =>  {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/auth/login');
      })  
    });

  }





  validarToken(): Observable <boolean>{

   
    return this.http.get(`${ base_url }/login/renew`, { 
     headers: {
      'x-token': this.token
      }
    }).pipe(
      map( (resp:any) =>{
        
        const { email, google, nombre, role, img = '' ,  uid } = resp.usuario;

        this.usuario = new Usuario( nombre , email , '' , img, google, role, uid)

        this.guardarLocalStorage( resp.token );
        return true;

      }),
      // of -> me permite crear un obsevable en base al valor que ponemos en el of(X) para no romper el ciclo.
      catchError( error => of(false))
        
    );
  }



  

    crearUsuario( formData: RegisterForm ) {
      
     return this.http.post(`${ base_url }/usuarios` , formData)
     .pipe(
      tap( (resp: any ) => {
        this.guardarLocalStorage( resp.token );
      })
   
     );
    
    }



    actualizarPerfil( data: {email: string , nombre: string , role:string}){

      data = {
        ...data,
        role: this.usuario.role
      }

      return this.http.put(`${ base_url }/usuarios/${ this.uid }` , data , this.headers );

    }



    login( formData: LoginForm ) {
      
      return this.http.post(`${ base_url }/login` , formData)
      .pipe(
        tap( (resp: any ) => {
          this.guardarLocalStorage( resp.token);
        })
     
       );
    }




    
    loginGoogle( token ) {
      
      return this.http.post(`${ base_url }/login/google` , { token })
      .pipe(
        tap( (resp: any ) => {
          this.guardarLocalStorage( resp.token );
        })
     
       );
    }



    cargarUsuarios( desde: number = 0 ){

      const url = `${ base_url }/usuarios?desde=${ desde }`;
      return this.http.get<CargarUsuario>( url, this.headers )
      .pipe(     
        map( resp => {

          // Arreglo de usuarios
          const usuarios = resp.usuarios.map( 
            user => new Usuario(user.nombre, user.email, '' , user.img, user.google , user.role, user.uid ) 
            );

          return {
            total: resp.total,
            usuarios
          };
        })
      )
    
    }



    eliminarUsuario( usuario: Usuario ){

      const url = `${ base_url }/usuarios/${ usuario.uid }`;
      return this.http.delete( url, this.headers );
  
    }


    guardarUsuario( usuario:Usuario ){

      return this.http.put(`${ base_url }/usuarios/${ usuario.uid }` , usuario , this.headers );

    }


}
