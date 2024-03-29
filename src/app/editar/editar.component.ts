import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

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

  showModal() {
    Swal.fire({
      title: 'Articulo editado',
      text: 'El articulo se ha editado correctamente.',
      icon: 'success',
      background: '#212121',
      color: '#928c8c',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#F15D11',
    });
  }
  
  onSubmit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.PostService.updatePost(this.editForm.value, id);
    this.showModal();
    this.router.navigate(['/panel/administracion/mostrar/articulos']);
  }
}
