import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Error } from '../interfaces/error';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  static URL = "https://jesusslatorre.github.io/codes.json";

  constructor(private httpClient: HttpClient) { }

  getError(codigo: string): Observable<Error[]> {
    const url = `${ServicesService.URL}?codigo=${codigo}`;
    return this.httpClient.get<Error[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Ha ocurrido un error en la solicitud HTTP:', error);
        return throwError('Error en la solicitud HTTP');
      })
    );
  }
}
