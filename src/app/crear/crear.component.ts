import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  onSubmit() {
    this.postService.createPost(this.productoForm.value);
    this.router.navigate(['/panel/administracion/mostrar/articulos']);
  }
}
