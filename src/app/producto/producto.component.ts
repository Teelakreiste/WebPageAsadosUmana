import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private postService: PostService) { }
  
  carnes: Producto[]
  pescados: Producto[]
  almuerzos: Producto[]
  bebidas: Producto[]

  ngOnInit(): void {
    this.byCategoria();
  }

  byCategoria() {
    this.byAlmuerzos();
    this.byPescados();
    this.byCarnes();
    this.byBebidas();
  }

  byCarnes() {
    this.postService.getPostByCategoria('Carnes').subscribe(data => {
      this.carnes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Producto
        } 
      })
      this.ordenarCarnesPorNombre();
    });
  }

  byPescados() {
    this.postService.getPostByCategoria('Pescados').subscribe(data => {
      this.pescados = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Producto
        } 
      })
      this.ordenarPescadosPorNombre();
    });
  }

  byBebidas() {
    this.postService.getPostByCategoria('Bebidas').subscribe(data => {
      this.bebidas = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Producto
        } 
      })
      this.ordenarBebidasPorNombre();
    });
  }
  
  byAlmuerzos() {
    this.postService.getPostByCategoria('Almuerzos').subscribe(data => {
      this.almuerzos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Producto
        } 
      })
      this.ordenarAlmuerzosPorNombre();
    });
  }
  
  //recorrer el array y ordenarlo por nombre
  ordenarAlmuerzosPorNombre() {
    this.almuerzos = this.almuerzos.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      } else if (a.nombre > b.nombre) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  ordenarPescadosPorNombre() {
    this.pescados = this.pescados.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      } else if (a.nombre > b.nombre) {
        return 1;
      } else {
        return 0;
      }
    });
  } 

  ordenarCarnesPorNombre() {
    this.carnes = this.carnes.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      } else if (a.nombre > b.nombre) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  ordenarBebidasPorNombre() {
    this.bebidas = this.bebidas.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      } else if (a.nombre > b.nombre) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
