import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`

body {
  margin: 0;
  padding: 0;
 
  background-color: black;
  height: 100vh;
}
#login .container #login-row #login-column #login-box {
  margin-top: 120px;
  max-width: 600px;
  height: 620px;
  border: 1px solid #9C9C9C;
  background-color: #EAEAEA;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -85px;
}

.buttonLogin{
  margin-top: 100px;
}

#google-btn{
 
  align-items:center;
  display: flex;
  justify-content:center;
  text-align:center;

}
 
  `]
})

export class LoginComponent implements OnInit {

  
    


  public formSubmitted = false;
  public auth2: any;
 
  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone
    ) { }


  ngOnInit(): void {
    this.renderButton();
  }


  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email ]],
    password: ['', Validators.required ],
    remember: [false]
  });

 
  

  login(){

    this.usuarioService.login( this.loginForm.value )
    .subscribe( resp => {

      if ( this.loginForm.get('remember').value ) {
        localStorage.setItem('email', this.loginForm.get('email').value );
      } else {
        localStorage.removeItem('email');
      }  
      
      // Navegar al dashboard en caso de login correcto
      this.router.navigateByUrl('/valvulas/listado');

    }, (err) => {
      // Si salta un error
      Swal.fire('Error', err.error.msg, 'error');
    });

  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
     
    });

    this.startApp();
  }




  async startApp() {
    
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
    
  };




  attachSignin(element) {
    
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
           const id_token = googleUser.getAuthResponse().id_token;
           
           this.usuarioService.loginGoogle( id_token)
           .subscribe( resp => {
              // Navegar al dashboard en caso de login correcto. ngzone vas a una biblioteca externa y angular pierde el control por un momento

              this.ngZone.run(() => {
                this.router.navigateByUrl('/valvulas/listado');
              })  
            
             });
          
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
