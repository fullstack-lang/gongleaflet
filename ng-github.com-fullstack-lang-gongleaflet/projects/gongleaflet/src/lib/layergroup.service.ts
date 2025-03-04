// generated by ng_file_service_ts
import { Injectable, Component, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT, Location } from '@angular/common'

/*
 * Behavior subject
 */
import { BehaviorSubject } from 'rxjs'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { LayerGroupAPI } from './layergroup-api'
import { LayerGroup, CopyLayerGroupToLayerGroupAPI } from './layergroup'

import { FrontRepo, FrontRepoService } from './front-repo.service';

// insertion point for imports

@Injectable({
  providedIn: 'root'
})
export class LayerGroupService {

  // Kamar Raïmo: Adding a way to communicate between components that share information
  // so that they are notified of a change.
  LayerGroupServiceChanged: BehaviorSubject<string> = new BehaviorSubject("");

  private layergroupsUrl: string

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    // path to the service share the same origin with the path to the document
    // get the origin in the URL to the document
    let origin = this.document.location.origin

    // if debugging with ng, replace 4200 with 8080
    origin = origin.replace("4200", "8080")

    // compute path to the service
    this.layergroupsUrl = origin + '/api/github.com/fullstack-lang/gongleaflet/go/v1/layergroups';
  }

  /** GET layergroups from the server */
  // gets is more robust to refactoring
  gets(GONG__StackPath: string, frontRepo: FrontRepo): Observable<LayerGroupAPI[]> {
    return this.getLayerGroups(GONG__StackPath, frontRepo)
  }
  getLayerGroups(GONG__StackPath: string, frontRepo: FrontRepo): Observable<LayerGroupAPI[]> {

    let params = new HttpParams().set("GONG__StackPath", GONG__StackPath)

    return this.http.get<LayerGroupAPI[]>(this.layergroupsUrl, { params: params })
      .pipe(
        tap(),
        catchError(this.handleError<LayerGroupAPI[]>('getLayerGroups', []))
      );
  }

  /** GET layergroup by id. Will 404 if id not found */
  // more robust API to refactoring
  get(id: number, GONG__StackPath: string, frontRepo: FrontRepo): Observable<LayerGroupAPI> {
    return this.getLayerGroup(id, GONG__StackPath, frontRepo)
  }
  getLayerGroup(id: number, GONG__StackPath: string, frontRepo: FrontRepo): Observable<LayerGroupAPI> {

    let params = new HttpParams().set("GONG__StackPath", GONG__StackPath)

    const url = `${this.layergroupsUrl}/${id}`;
    return this.http.get<LayerGroupAPI>(url, { params: params }).pipe(
      // tap(_ => this.log(`fetched layergroup id=${id}`)),
      catchError(this.handleError<LayerGroupAPI>(`getLayerGroup id=${id}`))
    );
  }

  // postFront copy layergroup to a version with encoded pointers and post to the back
  postFront(layergroup: LayerGroup, GONG__StackPath: string): Observable<LayerGroupAPI> {
    let layergroupAPI = new LayerGroupAPI
    CopyLayerGroupToLayerGroupAPI(layergroup, layergroupAPI)
    const id = typeof layergroupAPI === 'number' ? layergroupAPI : layergroupAPI.ID
    const url = `${this.layergroupsUrl}/${id}`;
    let params = new HttpParams().set("GONG__StackPath", GONG__StackPath)
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: params
    }

    return this.http.post<LayerGroupAPI>(url, layergroupAPI, httpOptions).pipe(
      tap(_ => {
      }),
      catchError(this.handleError<LayerGroupAPI>('postLayerGroup'))
    );
  }
  
  /** POST: add a new layergroup to the server */
  post(layergroupdb: LayerGroupAPI, GONG__StackPath: string, frontRepo: FrontRepo): Observable<LayerGroupAPI> {
    return this.postLayerGroup(layergroupdb, GONG__StackPath, frontRepo)
  }
  postLayerGroup(layergroupdb: LayerGroupAPI, GONG__StackPath: string, frontRepo: FrontRepo): Observable<LayerGroupAPI> {

    let params = new HttpParams().set("GONG__StackPath", GONG__StackPath)
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: params
    }

    return this.http.post<LayerGroupAPI>(this.layergroupsUrl, layergroupdb, httpOptions).pipe(
      tap(_ => {
        // this.log(`posted layergroupdb id=${layergroupdb.ID}`)
      }),
      catchError(this.handleError<LayerGroupAPI>('postLayerGroup'))
    );
  }

  /** DELETE: delete the layergroupdb from the server */
  delete(layergroupdb: LayerGroupAPI | number, GONG__StackPath: string): Observable<LayerGroupAPI> {
    return this.deleteLayerGroup(layergroupdb, GONG__StackPath)
  }
  deleteLayerGroup(layergroupdb: LayerGroupAPI | number, GONG__StackPath: string): Observable<LayerGroupAPI> {
    const id = typeof layergroupdb === 'number' ? layergroupdb : layergroupdb.ID;
    const url = `${this.layergroupsUrl}/${id}`;

    let params = new HttpParams().set("GONG__StackPath", GONG__StackPath)
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: params
    };

    return this.http.delete<LayerGroupAPI>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted layergroupdb id=${id}`)),
      catchError(this.handleError<LayerGroupAPI>('deleteLayerGroup'))
    );
  }

  // updateFront copy layergroup to a version with encoded pointers and update to the back
  updateFront(layergroup: LayerGroup, GONG__StackPath: string): Observable<LayerGroupAPI> {
    let layergroupAPI = new LayerGroupAPI
    CopyLayerGroupToLayerGroupAPI(layergroup, layergroupAPI)
    const id = typeof layergroupAPI === 'number' ? layergroupAPI : layergroupAPI.ID
    const url = `${this.layergroupsUrl}/${id}`;
    let params = new HttpParams().set("GONG__StackPath", GONG__StackPath)
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: params
    }

    return this.http.put<LayerGroupAPI>(url, layergroupAPI, httpOptions).pipe(
      tap(_ => {
      }),
      catchError(this.handleError<LayerGroupAPI>('updateLayerGroup'))
    );
  }

  /** PUT: update the layergroupdb on the server */
  update(layergroupdb: LayerGroupAPI, GONG__StackPath: string, frontRepo: FrontRepo): Observable<LayerGroupAPI> {
    return this.updateLayerGroup(layergroupdb, GONG__StackPath, frontRepo)
  }
  updateLayerGroup(layergroupdb: LayerGroupAPI, GONG__StackPath: string, frontRepo: FrontRepo): Observable<LayerGroupAPI> {
    const id = typeof layergroupdb === 'number' ? layergroupdb : layergroupdb.ID;
    const url = `${this.layergroupsUrl}/${id}`;


    let params = new HttpParams().set("GONG__StackPath", GONG__StackPath)
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: params
    };

    return this.http.put<LayerGroupAPI>(url, layergroupdb, httpOptions).pipe(
      tap(_ => {
        // this.log(`updated layergroupdb id=${layergroupdb.ID}`)
      }),
      catchError(this.handleError<LayerGroupAPI>('updateLayerGroup'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation in LayerGroupService', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error("LayerGroupService" + error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message)
  }
}
