import { Injectable } from '@angular/core';
import { Error } from '../interfaces/error';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';


const NODO_RAIZ = "errores";

@Injectable({
  providedIn: 'root'
})

export class LocalService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storage.create();
  }

  guardarCodigo(error: Error) {
    this.storage.get(NODO_RAIZ).
      then((data:any) => {
        if (data == null) {
          let errores = new Array();
          errores.push(error);
          this.storage.set(NODO_RAIZ, errores);
        } else {
          let errores = data;
          errores.push(error);
          this.storage.set(NODO_RAIZ, errores);
        }
      }).
      catch((error: string) => {
        console.error("Error:" + error);
      }).
      finally(() => {
        console.log("Fin del proceso de almacenamiento");
        
      });
  }

  getCodigo(codigo: string) : Observable<Error>{
    return new Observable(subscriber=>{
      this.storage.get(NODO_RAIZ).then((errores: any[] | null) => {
        if (errores!=null){
          let error = errores.find((p: Error) => p.Code == codigo);
          subscriber.next(error);
          subscriber.complete();
        } else {
          subscriber.error("No existen errores en la base de datos");
          subscriber.complete();
        }
      })});
  }

  getAllErrores() {
    return this.storage.get(NODO_RAIZ);
  }

  //Solución al problema de la asincronía
  borrarError(codigo: string) : Observable<any>{
    return new Observable(subscriber=> {
      this.getAllErrores().then((errores:Error[])=>{
        errores.splice(errores.findIndex(error=>error.Code == codigo),1);
        this.storage.set(NODO_RAIZ, errores).then(()=>{
          subscriber.next();
          subscriber.complete();
        });
      });
    })
  }

  //Problema de asincronía
  /*
  borrarPelicula(titulo: string){
    this.getAllPeliculas().then((peliculas:Pelicula[])=>{
      peliculas.splice(peliculas.findIndex(pelicula=>pelicula.Title==titulo),1);
      this.storage.set(NODO_RAIZ, peliculas);
    });
  }
  */
}