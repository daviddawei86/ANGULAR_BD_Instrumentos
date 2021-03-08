import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Usuario } from 'src/app/models/usuario.model';
import { Valvula } from 'src/app/models/valvula.model';
import { BusquedasService } from 'src/app/services/busquedas.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public valvulas: Valvula[] = [];
 

  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params
                  .subscribe( ({ termino }) => this.busquedaGlobal( termino ));
            
  }


  busquedaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp)
          this.usuarios   = resp.usuarios;
          this.valvulas   = resp.valvulas;
       
        });

        

  }

}