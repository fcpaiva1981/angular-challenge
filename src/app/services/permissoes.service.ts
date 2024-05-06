import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {Permissao} from '../model/permissao';
import {privateDecrypt} from "node:crypto";
import {Usuario} from "../model/usuario";
@Injectable({
  providedIn: 'root'
})
export class PermissoesService {

  url = 'https://localhost:32774/api/Permissao';
  constructor(private httpClient: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getPermissoes(): Observable<Permissao[]> {
    return this.httpClient.get<Permissao[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


  getPermissaoById(id: number): Observable<Permissao> {
    return this.httpClient.get<Permissao>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  savePermissao(permissao: Permissao): Observable<Permissao> {
    return this.httpClient.post<Permissao>(this.url, JSON.stringify(permissao), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  updatePermissao(permissao: Permissao): Observable<Permissao> {
    return this.httpClient.put<Permissao>(this.url + '/' + permissao.id, JSON.stringify(permissao), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  deletePermissao(permissao: Permissao) {
    return this.httpClient.delete<Permissao>(this.url + '/' + permissao.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;
    } else {

      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
