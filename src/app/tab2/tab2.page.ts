import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Error } from '../interfaces/error';
import { LocalService } from '../services/local.service';
import { ServicesService } from '../services/services.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  mensajeVisible: boolean = false;
  botonCierre = ['Aceptar'];

  mensaje = {
    header: "OBD2 List",
    message: ""
  };

  codigo: string = "";
  cargando: boolean = false;
  error: Error | null = null;

  constructor(private httpds: ServicesService, private ldbs: LocalService) {}

  ngOnInit() {
    console.log("tab2.page.ngOnInit...");
  }

  mostrarMensaje(mensaje: string) {
    this.mensaje.message = mensaje;
    this.setOpen(true);
  }

  setOpen(open: boolean) {
    this.mensajeVisible = open;
  }

  buscarError() {
    this.cargando = true;
    console.log("Buscando error...");
    this.httpds.getError(this.codigo).subscribe({
      next: (errores: Error[]) => {
        console.warn("La petición se ha resuelto satisfactoriamente");
        const codigo = this.codigo.trim();
        const erroresFiltrados = errores.filter(error => error.Code === codigo);
        if (erroresFiltrados.length > 0) {
          this.error = erroresFiltrados[0];
          this.mostrarMensaje("El error ha sido encontrado");
        } else {
          this.mostrarMensaje("No se encontró ningún error con ese código");
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error("Ha ocurrido un error:", error);
        this.mostrarMensaje("Ha ocurrido un error al acceder a la base de datos");
        this.cargando = false;
      }
    });
  }
  
  guardarError() {
    console.log("Error guardado antes del if");
    if (this.error) {
      this.ldbs.guardarCodigo(this.error);
      this.error = null;
      this.codigo = "";
      console.log("Error guardado");
      
    } else {
      console.error("No hay error para guardar");
    }
  }
}
