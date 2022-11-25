import { IAuthor } from './author';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

constructor(private http: HttpClient) { }

getAuthorsList(): Observable<IAuthor[]>{
  return this.http.get<IAuthor[]>("http://localhost:3000/author").pipe(
    tap((author) => console.log(author)),
    catchError(this.handleError)
  )
}

getAuthorById(id: number): Observable<IAuthor>{
  return this.http.get<IAuthor>("http://localhost:3000/author/"+id).pipe(
    tap((author) => console.log(author)),
    catchError(this.handleError)
  )
}

createAuthor(author: IAuthor): Observable<IAuthor[]>{
  return this.http.post<IAuthor[]>("http://localhost:3000/author", author).pipe(
    tap((author) => console.log(author)),
    catchError(this.handleError)
  )
}

updatedAuthor(author: IAuthor, id:number): Observable<IAuthor[]>{
  return this.http.put<IAuthor[]>(`http://localhost:3000/author/${id}`, author).pipe(
    tap((author) => console.log(author)),
    catchError(this.handleError)
  )
}

deleteAuthor(id: number): Observable<IAuthor[]>{
  return this.http.delete<IAuthor[]>(`http://localhost:3000/author/${id}`).pipe(
    tap((author) => console.log(author)),
    catchError(this.handleError)
  )
}


private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  return throwError(() => new Error('Something bad happened; please try again later.'));
}

}
