import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Error } from '../interfaces/error';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


   //CONFIRMACIÓN DE BORRADO - START
   public deleteButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Cancelando borrado');
        this.confirmDeleteOpen=false;
      }
    },
    {
      text: 'Borrar',
      role: 'confirm',
      handler: () => {
        console.log('Borrando error');
        this.confirmDeleteOpen=false;
        this.ldbs.borrarError(this.codigoErrorBorrar).subscribe(
          value => this.recuperarErrores()
        );
      },
    },
  ];
  public confirmDeleteOpen:boolean=false;
  public codigoErrorBorrar:string="";
  //CONFIRMACIÓN DE BORRADO - END


  codigo:string="";
  
  errores:Error[]=[];
  erroresOriginales:Error[]=[];
  constructor(private ldbs:LocalService, private ar:ActivatedRoute){
  }
  ngOnInit(): void {
    
      this.recuperarErrores();
    
  }

  recuperarErrores() {
    this.ldbs.getAllErrores().then(erroresAlmacenados => {
      this.errores = erroresAlmacenados || [];
    }).catch(error => {
      console.error('Error al recuperar los errores:', error);
    });
  }

  borrar(codigo:string){
    console.log("Borrando " + codigo);
    this.codigoErrorBorrar=codigo;
    this.confirmDeleteOpen=true;
  }
  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}