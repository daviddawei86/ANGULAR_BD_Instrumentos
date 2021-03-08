import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Valvula } from 'src/app/models/valvula.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ValvulaService } from 'src/app/services/valvula.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit , OnDestroy {

  public valvulas: Valvula[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  

  constructor(private valvulaService: ValvulaService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarValvulas();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe( img => this.cargarValvulas());
  }


  cargarValvulas(){

    this.cargando = true;

    this.valvulaService.cargarValvulas()
    .subscribe( valvulas => {
      this.cargando = false;
      this.valvulas = valvulas;
    })

  }

 

  eliminarValvula( valvula: Valvula){

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar el médico ${ valvula.nombre }`,
      icon: 'question',
      showCancelButton: true,   
      confirmButtonText: 'Si , borrar'
    }).then((result) => {
      if (result.value) {
       
        this.valvulaService.borrarValvula(valvula._id)
        .subscribe( resp => {

          this.cargarValvulas();

          Swal.fire(
            'Válvula borrada', 
            `${ valvula.nombre } fue eliminado correctamente`,
            'success'        
          );
          });
      }
    })

  }



  buscar( termino: string){

    if( termino.length === 0 ) {
      return this.cargarValvulas();
    }

    this.busquedasService.buscar('valvulas', termino )
    .subscribe( resp => {
      this.valvulas = resp;
    });

  }


abrirModal(valvula: Valvula){

  this.modalImagenService.abrirModal('valvulas', valvula._id, valvula.img );
}

 





}
