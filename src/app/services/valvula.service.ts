import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Valvula } from '../models/valvula.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ValvulaService {

  constructor(private http: HttpClient) { }


  get token(): string {

    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
        }
    }
  }



  cargarValvulas(){

    // Para hacer paginación hacer igual que el servicio de usuarios es lo mismo.
    const url = `${ base_url }/valvulas`;
    return this.http.get( url, this.headers )
    .pipe(
      map( (resp: {ok: boolean, valvulas:Valvula[] }) => resp.valvulas )
    );
   
  
  }

  obtenerValvulaPorId( id: string ){

  
    const url = `${ base_url }/valvulas/${ id }`;
    return this.http.get( url, this.headers )
    .pipe(
      map( (resp: {ok: boolean, valvula:Valvula }) => resp.valvula )
    );
   
  
  }


  crearValvula( valvula: {nombre: string, zona: string, sector: string, PI: string, instalado: boolean, fecha: Date} ){

    
    const url = `${ base_url }/valvulas`;
    return this.http.post( url, valvula ,this.headers );
    
  }


  actualizarValvula( valvula: Valvula ){

   
    const url = `${ base_url }/valvulas/${ valvula._id }`;
    return this.http.put( url, valvula,this.headers );
    
  }


  borrarValvula( _id:string){

 
    const url = `${ base_url }/valvulas/${ _id }`;
    return this.http.delete( url, this.headers );
    
  }










}
