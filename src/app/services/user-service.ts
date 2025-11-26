import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersUrl:string = 'https://jsonplaceholder.typicode.com/users';
  private readonly http:HttpClient=inject(HttpClient);

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      catchError((error:HttpErrorResponse)=>this.handleError(error,'users'))
    );
  }
  getUserById(id: number):Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError((error:HttpErrorResponse)=>this.handleError(error,`user with id=${id}`))
    );
  }
  // postUser(user: any) {}
  // deleteUser(id: number) {}

  handleError(error:HttpErrorResponse, label:string):Observable<never>{
    let errorMessage=`There was an error trying to get the data for ${label}`;

    let detailedMessage=`**There was an error trying to get the data for ${label.toLocaleUpperCase()}** Status:${error.status}. Message: ${error.message}`;

    console.error(detailedMessage);

    return throwError(()=>errorMessage);
  }

}
