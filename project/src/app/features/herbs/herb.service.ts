import { Injectable } from '@angular/core';
import { Herb } from '../../types/herb';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HerbService {

  private STORAGE_KEY = 'herbs';
  private apiUrl = 'http://localhost:3000/herbs';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Herb[]> {
    // return this.getHerbs();
    return this.http.get<Herb[]>(this.apiUrl);
  }

  getOne(id: string): Observable<Herb> {
    return this.http.get<Herb>(`${this.apiUrl}/${id}`);
  }

  getLatest(count: number = 3): Herb[] {
    return this.getHerbs()
      .slice()
      .sort((a, b) => Number(b.id) - Number(a.id))
      .slice(0,count);
  }

  // create(herb: Herb) {
  //   const herbs = this.getHerbs();
  //   herbs.push(herb);
  //   localStorage.setItem(this.STORAGE_KEY, JSON.stringify(herbs));
  // }

  create(herb: Omit<Herb, 'id'>): Observable<Herb> {
    return this.http.post<Herb>(this.apiUrl, herb);
  }

  // update(id: string, updatedHerb: Herb) {
  //   const herbs = this.getHerbs().map(h =>
  //     h.id === id ? updatedHerb : h
  //   );
  //   localStorage.setItem(this.STORAGE_KEY, JSON.stringify(herbs));
  // }


  update(id: string, herb: Herb): Observable<Herb> {
    return this.http.put<Herb>(`${this.apiUrl}/${id}`, herb);
  }

  // delete(id: string) {
  //   const herbs = this.getHerbs().filter(h => h.id !== id);
  //   localStorage.setItem(this.STORAGE_KEY, JSON.stringify(herbs));
  // }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  private getHerbs(): Herb[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
