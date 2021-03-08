import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`

body {
  margin: 0;
  padding: 0;
  background-color: #800000;
  height: 100vh;
}
#register .container #register-row #register-column #register-box {
  margin-top: 120px;
  max-width: 600px;
  height: 580px;
  border: 1px solid #9C9C9C;
  background-color: #EAEAEA;
}
#register .container #register-row #register-column #register-box #register-form {
  padding: 20px;
}
#register .container #register-row #register-column #register-box #register-form #register-link {
  margin-top: -85px;
}
 
  
  `]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['David', [ Validators.required, Validators.minLength(2) ]],
    email: ['prueba@gmail.com', [Validators.required, Validators.email ]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [ false, Validators.requiredTrue],
  }, {

  validators: this.passwordsIguales('password','password2')
  
  });

  constructor( private fb: FormBuilder,
    private usuarioService : UsuarioService,
    private router : Router ) { }

    

crearUsuario() {

this.formSubmitted = true;
console.log( this.registerForm.value );

if( this.registerForm.invalid ){
return;
} 

//Realizar posteo
this.usuarioService.crearUsuario( this.registerForm.value )
.subscribe( resp => {

// Navegar al dashboard en caso de login correcto
this.router.navigateByUrl('/valvulas/listado');

}, (err) => {
// Si salta un error
Swal.fire('Error', err.error.msg, 'error');
});


}

campoNoValido( campo: string): boolean {

if ( this.registerForm.get(campo).invalid && this.formSubmitted ){
return true;
} else {
return false;
}

}

invalidPassword(){

const pass1 = this.registerForm.get('password').value;
const pass2 = this.registerForm.get('password2').value;

if ( pass1 !== pass2 && this.formSubmitted) {
return true;
} else {
return false;
}

}

aceptarTerminos(){
// si esta en falso los terminos y esta submitted
return !this.registerForm.get('terminos').value && this.formSubmitted;
}

passwordsIguales(pass1:string , pass2:string){

return ( formGroup: FormGroup) => {

const pass1Control = formGroup.get(pass1);
const pass2Control = formGroup.get(pass2);

// Errors te dicen el error si peta
if ( pass1Control.value === pass2Control.value ) {
pass2Control.setErrors(null)
} else {
pass2Control.setErrors({ noEsIgual: true})
}

}

}





}
