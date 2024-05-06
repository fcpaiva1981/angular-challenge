import { Routes } from '@angular/router';
import {UsuariosListComponent} from "./componets/usuarios-list/usuarios-list.component";

export const routes: Routes = [
  {
    path:"",
    component:UsuariosListComponent,
  },
  {
    path:"usuarios-list",
    component:UsuariosListComponent,
  }
];
