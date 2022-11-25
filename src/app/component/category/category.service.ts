import { Observable, catchError, tap, throwError } from 'rxjs';
import { ICategory } from './category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getListCategory(): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`http://localhost:3000/category`).pipe(
      tap((category) => console.log(category)),
      catchError(this.handleError)
    )
  }

  updatedCategory(category: ICategory, id:number): Observable<ICategory[]>{
    return this.http.put<ICategory[]>(`http://localhost:3000/category/${id}`, category).pipe(
      tap((category) => console.log(category)),
      catchError(this.handleError)
    )
  }

  deleteCategory(id:number): Observable<ICategory[]>{
    return this.http.delete<ICategory[]>(`http://localhost:3000/category/${id}`).pipe(
      tap((category) => console.log(category)),
      catchError(this.handleError)
    )
  }

  createCategory(category: ICategory): Observable<ICategory[]>{
    return this.http.post<ICategory[]>(`http://localhost:3000/category`, category).pipe(
      tap((category) => console.log(category)),
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
