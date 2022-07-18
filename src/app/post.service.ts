import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore: AngularFirestore) { 
  }
  getPosts() {
    return this.angularFirestore.collection("Productos").snapshotChanges();
  }
  getPost(id: string) {
    return this.angularFirestore.collection("Productos").doc(id).valueChanges();
  }

  getPostByCategoria(categoria: string) {
    return this.angularFirestore.collection("Productos", ref => ref.where('categoria', '==', categoria)).snapshotChanges();
  }
  
  createPost(producto: Producto) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("Productos")
        .add(producto)
        .then(res => {
          console.log(res);
          resolve(res);
        }, err => reject(err));
    });
    /*this.angularFirestore.collection("Productos").add(producto);*/
  }
  updatePost(producto: Producto, id: string) {
    return this.angularFirestore
        .collection("Productos")
        .doc(id)
        .update({
          categoria: producto.categoria,
          nombre: producto.nombre,
          precio: producto.precio
        });
    /*this.angularFirestore.doc("Productos/" + id).update(producto);*/
  }
  deletePost(id: string) {
    return this.angularFirestore
        .collection("Productos")
        .doc(id)
        .delete();
    /*this.angularFirestore.doc("Productos/" + id).delete();*/
  }
}
