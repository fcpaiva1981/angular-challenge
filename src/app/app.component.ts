import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Usuario} from "./model/usuario";
import {UsuariosService} from "./services/usuarios.service";
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    NgClass
  ],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angularchallenge';
  usuario = {} as Usuario;
  usuarios: Usuario[] = [];


  constructor(private usuarioService: UsuariosService) {
  }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios
    });
  }

  editUsuario(usuario: Usuario) {
    this.usuario = {...usuario};
  }

  deleteUsuario(usuarios: Usuario) {
    this.usuarioService.deleteUsuario(usuarios).subscribe(() => {
      this.getUsuarios()
    });
  }

  saveUsuario(form: NgForm) {
    if (this.usuario.id !== undefined) {
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.cleanForm(form)
      });
    } else {
      this.usuarioService.saveUsuario(this.usuario).subscribe(() => {
        this.cleanForm(form)
      });
    }
  }

  cleanForm(form: NgForm) {
    this.getUsuarios();
    form.resetForm();
    let usuario = {} as Usuario;
  }
}
