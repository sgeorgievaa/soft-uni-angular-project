import { Injectable } from '@angular/core';
import { Herb } from '../../types/herb';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

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
      map(herbs => herbs.sort((a, b) => Number(b.id) - Number(a.id)))
    );
  }

  getOne(id: string): Observable<Herb | undefined> {
    return this.getAll().pipe(
      map(herbs => herbs.find(h => Number(h.id) === Number(id)))
    );
  }

  getLatest(count: number = 3): Observable<Herb[]> {
    return this.getAll().pipe(
      map(herbs => herbs.slice(0, count))
    );
  }

  create(herb: Omit<Herb, 'id'>): Observable<Herb> {
    return this.http.post<Herb>(this.apiUrl, herb);
  }


  update(id: string, herb: Herb): Observable<Herb> {
    return this.http.put<Herb>(`${this.apiUrl}/${id}`, herb);
  }


  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  private getHerbs(): Herb[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
