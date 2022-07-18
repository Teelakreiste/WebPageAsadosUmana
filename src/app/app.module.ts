import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { InicioComponent } from './inicio/inicio.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { AcercaComponent } from './acerca/acerca.component';
import { ServicioComponent } from './servicio/servicio.component';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PieComponent } from './pie/pie.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment/*,firebaseConfig*/ } from 'src/environments/environment';
import { MostrarComponent } from './mostrar/mostrar.component';
import { EditarComponent } from './editar/editar.component';
import { CrearComponent } from './crear/crear.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CabeceraComponent,
    InicioComponent,
    PresentacionComponent,
    AcercaComponent,
    ServicioComponent,
    ProductoComponent,
    ContactoComponent,
    PieComponent,
    MostrarComponent,
    EditarComponent,
    CrearComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path: 'presentacion', component:PresentacionComponent},
      {path: 'acerca', component:AcercaComponent},
      {path: 'servicio', component:ServicioComponent},
      {path: 'lista/productos', component:ProductoComponent},
      {path: 'contacto', component:ContactoComponent},
      {path: 'panel/administracion/mostrar/articulos', component:MostrarComponent},
      {path: 'panel/administracion/editar/articulo/:id', component:EditarComponent},
      {path: 'panel/administracion/nuevo/articulo', component:CrearComponent}
    ]),
    ReactiveFormsModule, // <-- include ReactiveFormsModule in imports
    FormsModule // <-- include FormsModule in imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
