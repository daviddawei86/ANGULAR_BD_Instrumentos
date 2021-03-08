import { environment } from '../../environments/environment';

const base_url = environment.base_url;

interface _valvulaUser {
    _id: string;
    nombre: string;
    img: string;
    zona: string;
    sector: string;
    PI: string;
    instalado: boolean;
    fecha: Date;
    
}

export class Valvula {

    constructor(
             
        
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _valvulaUser,
        public zona?: string,
        public sector?: string,
        public PI?: string,
        public instalado?: boolean,
        public fecha?: Date,

    ){}

  
}




