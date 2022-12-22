import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Models
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  url = 'https://dummyjson.com/products';
  constructor(private http: HttpClient) {}

  fetchAll(): Observable<any> {
    return this.http
      .get<any>(this.url)
      .pipe(
        catchError((error: HttpErrorResponse) => observableThrowError(error))
      );
  }
}
