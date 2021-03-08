import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Valvula } from 'src/app/models/valvula.model';
import { ValvulaService } from 'src/app/services/valvula.service';

@Component({
  selector: 'app-valvula',
  templateUrl: './valvula.component.html',
  styles: [
  ]
})
export class ValvulaComponent implements OnInit {

  public valvulaForm: FormGroup;


  public valvulaSeleccionado: Valvula;
  

  constructor( private fb: FormBuilder,
               private valvulaService: ValvulaService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ id }) => {
      this.cargarValvula( id );
    })

    this.valvulaForm = this.fb.group({
      nombre: ['', Validators.required ],
      zona: [''],
      sector: [''],
      PI: [''],
      instalado: [false],
      fecha: ['' ],
    });
  }



  cargarValvula(id: string){

    if( id === 'nuevo' ) {
      return;
    }

     this.valvulaService.obtenerValvulaPorId( id )
     .pipe(
       delay(100)
     )
      .subscribe( valvula => {

        if ( !valvula ) {
          this.router.navigateByUrl(`/valvulas/listado`)
        }
     
        const { nombre,zona,sector,PI,instalado,fecha } = valvula;
        this.valvulaSeleccionado = valvula;
        this.valvulaForm.setValue({ nombre,zona,sector,PI,instalado,fecha  });

      });
  }



    guardarValvula(){

      const { nombre,zona,sector,PI,instalado,fecha } = this.valvulaForm.value;

      if( this.valvulaSeleccionado) {
        //actualizar
        const data = { 
          ...this.valvulaForm.value,
          _id: this.valvulaSeleccionado._id
        }

        this.valvulaService.actualizarValvula( data )
        .subscribe( resp => {
          Swal.fire('Actualizado',`${ nombre } actualizado correctamente`, 'success');
        })

      } else {
        // crear
        this.valvulaService.crearValvula( this.valvulaForm.value)
          .subscribe( (resp:any) => {
            console.log(resp);
            Swal.fire('Creado',`${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/valvulas/listado/${ resp.valvula._id}`)
          })

      }


     
    }



  
}
