import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //Ingrese el tokern aqui
    Swal.fire({
      title: 'Ingrese el token',
      input: 'text',
      inputPlaceholder: 'Ingrese el token',
      background: '#212121',
      color: '#928c8c',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value === 'aO3L9M&lhiNJR526rk') {
        this.router.navigate(['/panel/administracion/crear/articulos']);
        Swal.fire({
          title: 'Token correcto',
          text: 'El token es correcto',
          icon: 'success',
          background: '#212121',
          color: '#928c8c',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#F15D11'
        });
        this.router.navigate(['panel/administracion/mostrar/articulos']);
      }
    });
  }


}
