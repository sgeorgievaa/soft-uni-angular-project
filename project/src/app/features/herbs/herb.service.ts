import { Injectable } from '@angular/core';
import { Herb } from '../../types/herb';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HerbService {

  private STORAGE_KEY = 'herbs';
  private apiUrl = 'http://localhost:3000/herbs';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Herb[]> {
    return this.http.get<Herb[]>(this.apiUrl).pipe(
      tap(() => console.log('Herbs fetched from API')),
      map(herbs => herbs.sort((a, b) => Number(b.id) - Number(a.id))),
      catchError(err => {
        console.error('Error fetching herbs:', err);
        return throwError(() => new Error('Failed to load herbs'));
      })
    );
  }

  getOne(id: string): Observable<Herb | undefined> {
    return this.getAll().pipe(
      map(herbs => herbs.find(h => Number(h.id) === Number(id))),
      catchError(err => {
        console.error('Error fetching herb:', err);
        return throwError(() => new Error('Failed to load herb'));
      })
    );
  }

  getLatest(count: number = 3): Observable<Herb[]> {
    return this.getAll().pipe(
      map(herbs => herbs.slice(0, count)),
      catchError(err => {
        console.error('Error fetching latest herbs:', err);
        return throwError(() => new Error('Failed to load latest herbs'));
      })
    );
  }

  create(herb: Omit<Herb, 'id'>): Observable<Herb> {
    return this.http.post<Herb>(this.apiUrl, herb).pipe(
      tap(() => console.log('Herb created')),
      catchError(err => {
        console.error('Error creating herb:', err);
        return throwError(() => new Error('Failed to create herb'));
      })
    );
  }


  update(id: string, herb: Herb): Observable<Herb> {
    return this.http.put<Herb>(`${this.apiUrl}/${id}`, herb).pipe(
      tap(() => console.log('Herb updated')),
      catchError(err => {
        console.error('Error updating herb:', err);
        return throwError(() => new Error('Failed to update herb'));
      })
    );
  }


  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Herb deleted')),
      catchError(err => {
        console.error('Error deleting herb:', err);
        return throwError(() => new Error('Failed to delete herb'));
      })
    );
  }
  }


  // private getHerbs(): Herb[] {
  //   const data = localStorage.getItem(this.STORAGE_KEY);
  //   return data ? JSON.parse(data) : [];
  // }

