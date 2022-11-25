import { IBook } from './book';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  createBook(book: IBook[]): Observable<IBook[]>{
    return this.http.post<IBook[]>("http://localhost:3000/book", book).pipe(
      tap((book) => {console.log(book)}),
      catchError(this.handleError)
    )
  }

  updatedBook(book: IBook[], id: number): Observable<IBook[]>{
    return this.http.put<IBook[]>("http://localhost:3000/book/"+id, book).pipe(
      tap((book) => {console.log(book)}),
      catchError(this.handleError)
    )
  }

  getAllBook(): Observable<IBook[]>{
    return this.http.get<IBook[]>("http://localhost:3000/book/").pipe(
      tap((book) => {console.log(book)}),
      catchError(this.handleError)
    )
  }

  deveteBook(id: number): Observable<IBook[]>{
    return this.http.delete<IBook[]>("http://localhost:3000/book/"+id).pipe(
      tap((book) => {console.log(book)}),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Une erreur s\'est produite:', error.error);
    } else {
      console.error(
        `Backend retourne le code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Quelque chose de mauvais; Essayez apres s\'il vous plait.'));
  }
}
