import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  public editForm: FormGroup;
  productoRef: any;

  categorias = [
    'Almuerzos',
    'Pescados',
    'Carnes',
    'Bebidas'
  ];

  constructor(
    public PostService: PostService,
    public formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.editForm = this.formBuilder.group({
      nombre: [''],
      categoria: [''],
      precio: ['']
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.PostService.getPost(id).subscribe(data => {
      this.productoRef = data;
      this.editForm = this.formBuilder.group({
        nombre: [this.productoRef.nombre],
        categoria: [this.productoRef.categoria],
        precio: [this.productoRef.precio]
      });
    });
  }
  
  onSubmit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.PostService.updatePost(this.editForm.value, id);
    this.router.navigate(['/panel/administracion/mostrar/articulos']);
  }
}
