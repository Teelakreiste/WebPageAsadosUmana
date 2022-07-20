import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Producto } from '../producto.model';

import { FormGroup, FormControl, Validators } from '@angular/forms'; // <-- NgModel lives here
import { debounceTime } from 'rxjs/operators'; // <-- Import debounceTime operator from rxjs/operators

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {

  form: FormGroup; // <-- Add this line

  constructor(private postService: PostService) { 
    this.buildForm(); // <-- Add this line
    this.produ = null;
  }

  produ: Producto[]
  productos: Producto[]
  fil: string = '';

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.productos = posts.map(post => {
        return {
          id: post.payload.doc.id,
          ...post.payload.doc.data() as Producto
        }
      })
    }); 
  }

  deleteRow(producto : Producto) {
    //this.postService.deletePost(producto.id);
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      background: '#212121',
      color: '#928c8c',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.postService.deletePost(producto.id);
        Swal.fire({
          title: 'Eliminado!',
          text: 'El articulo se ha eliminado correctamente.',
          icon: 'success',
          background: '#212121',
          color: '#928c8c',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#F15D11'
        });
      }
    })
  }
  
  private buildForm() { // <-- Add this line
    this.form = new FormGroup({
      buscar: new FormControl('', [Validators.required]),
    });
    this.form.valueChanges
    .pipe(debounceTime(100))
    .subscribe(data => {
      this.metods(data.buscar);
    });
  }

  metods(data: string) {
      this.fil = data;
      this.filtrar(this.fil);
  }

  filtrar(buscar: string) {  // <-- Add this line
    if (buscar.length > 0) {
      this.produ = this.productos.filter(producto => {
        if (producto.id.toLowerCase().includes(buscar.toLowerCase())) {
          return producto.id.toLowerCase().includes(buscar.toLowerCase());
        } else if (producto.nombre.toLowerCase().includes(buscar.toLowerCase())) {
          return producto.nombre.toLowerCase().includes(buscar.toLowerCase());
        } else if (producto.categoria.toLowerCase().includes(buscar.toLowerCase())) {
          return producto.categoria.toLowerCase().includes(buscar.toLowerCase());
        } else {
          return producto.precio.toString().toLowerCase().includes(buscar.toLowerCase());
        }
     });
    }
  }
  
  isFilterSearh(): void {
    if (this.fil.length > 0) {
      this.filtrar(this.fil);
    }
  }

  //Recorrer el array de productos y ordenarlo por categoria
  ordenarPorCategoria() {
    this.isFilterSearh();
    this.productos = this.productos.sort((a, b) => {
      if (a.categoria < b.categoria) {
        return -1;
      } else if (a.categoria > b.categoria) {
        return 1;
      } else {
        return 0;
      }
    });
    this.isFilterSearh();
  }

  //Recorrer el array de productos y ordenarlo por precio
  ordenarPorPrecio() {
    this.productos = this.productos.sort((a, b) => {
      if (a.precio < b.precio) {
        return -1;
      } else if (a.precio > b.precio) {
        return 1;
      } else {
        return 0;
      }
    });
    this.isFilterSearh();
  }

  //Recorrer el array de productos y ordenarlo por nombre
  ordenarPorNombre() {
    this.productos = this.productos.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      } else if (a.nombre > b.nombre) {
        return 1;
      } else {
        return 0;
      }
    });
    this.isFilterSearh();
  }

  //Recorrer el array de productos y ordenarlo por id
  ordenarPorId() {
    this.productos = this.productos.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
    this.isFilterSearh();
  }
}
