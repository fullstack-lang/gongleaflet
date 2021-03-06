// generated by ng_file_service_ts
import { Injectable, Component, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT, Location } from '@angular/common'

/*
 * Behavior subject
 */
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CheckoutSchedulerDB } from './checkoutscheduler-db';

// insertion point for imports

@Injectable({
  providedIn: 'root'
})
export class CheckoutSchedulerService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Kamar Raïmo: Adding a way to communicate between components that share information
  // so that they are notified of a change.
  CheckoutSchedulerServiceChanged: BehaviorSubject<string> = new BehaviorSubject("");

  private checkoutschedulersUrl: string

  constructor(
    private http: HttpClient,
    private location: Location,
    @Inject(DOCUMENT) private document: Document
  ) {
    // path to the service share the same origin with the path to the document
    // get the origin in the URL to the document
    let origin = this.document.location.origin

    // if debugging with ng, replace 4200 with 8080
    origin = origin.replace("4200", "8080")

    // compute path to the service
    this.checkoutschedulersUrl = origin + '/api/github.com/fullstack-lang/gongleaflet/go/v1/checkoutschedulers';
  }

  /** GET checkoutschedulers from the server */
  getCheckoutSchedulers(): Observable<CheckoutSchedulerDB[]> {
    return this.http.get<CheckoutSchedulerDB[]>(this.checkoutschedulersUrl)
      .pipe(
        tap(_ => this.log('fetched checkoutschedulers')),
        catchError(this.handleError<CheckoutSchedulerDB[]>('getCheckoutSchedulers', []))
      );
  }

  /** GET checkoutscheduler by id. Will 404 if id not found */
  getCheckoutScheduler(id: number): Observable<CheckoutSchedulerDB> {
    const url = `${this.checkoutschedulersUrl}/${id}`;
    return this.http.get<CheckoutSchedulerDB>(url).pipe(
      tap(_ => this.log(`fetched checkoutscheduler id=${id}`)),
      catchError(this.handleError<CheckoutSchedulerDB>(`getCheckoutScheduler id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new checkoutscheduler to the server */
  postCheckoutScheduler(checkoutschedulerdb: CheckoutSchedulerDB): Observable<CheckoutSchedulerDB> {

    // insertion point for reset of pointers and reverse pointers (to avoid circular JSON)

    return this.http.post<CheckoutSchedulerDB>(this.checkoutschedulersUrl, checkoutschedulerdb, this.httpOptions).pipe(
      tap(_ => {
        // insertion point for restoration of reverse pointers
        this.log(`posted checkoutschedulerdb id=${checkoutschedulerdb.ID}`)
      }),
      catchError(this.handleError<CheckoutSchedulerDB>('postCheckoutScheduler'))
    );
  }

  /** DELETE: delete the checkoutschedulerdb from the server */
  deleteCheckoutScheduler(checkoutschedulerdb: CheckoutSchedulerDB | number): Observable<CheckoutSchedulerDB> {
    const id = typeof checkoutschedulerdb === 'number' ? checkoutschedulerdb : checkoutschedulerdb.ID;
    const url = `${this.checkoutschedulersUrl}/${id}`;

    return this.http.delete<CheckoutSchedulerDB>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted checkoutschedulerdb id=${id}`)),
      catchError(this.handleError<CheckoutSchedulerDB>('deleteCheckoutScheduler'))
    );
  }

  /** PUT: update the checkoutschedulerdb on the server */
  updateCheckoutScheduler(checkoutschedulerdb: CheckoutSchedulerDB): Observable<CheckoutSchedulerDB> {
    const id = typeof checkoutschedulerdb === 'number' ? checkoutschedulerdb : checkoutschedulerdb.ID;
    const url = `${this.checkoutschedulersUrl}/${id}`;

    // insertion point for reset of pointers and reverse pointers (to avoid circular JSON)

    return this.http.put<CheckoutSchedulerDB>(url, checkoutschedulerdb, this.httpOptions).pipe(
      tap(_ => {
        // insertion point for restoration of reverse pointers
        this.log(`updated checkoutschedulerdb id=${checkoutschedulerdb.ID}`)
      }),
      catchError(this.handleError<CheckoutSchedulerDB>('updateCheckoutScheduler'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {

  }
}
