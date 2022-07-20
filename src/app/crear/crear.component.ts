import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  public productoForm: FormGroup;

  categorias = [
    'Almuerzos',
    'Pescados',
    'Carnes',
    'Bebidas'
  ];

  constructor(
    public postService: PostService,
    public formBuilder: FormBuilder,
    public router: Router
    ) {
      this.productoForm = this.formBuilder.group({
        nombre: [''],
        categoria: [''],
        precio: ['']
      });
  }

  ngOnInit(): void { }

  showModal() {
    Swal.fire({
      title: 'Articulo creado',
      text: 'El articulo se ha creado correctamente.',
      icon: 'success',
      background: '#212121',
      color: '#928c8c',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#F15D11'
    });
  }

  onSubmit() {
    this.postService.createPost(this.productoForm.value);
    this.showModal();
    this.router.navigate(['/panel/administracion/mostrar/articulos']);
  }
}
