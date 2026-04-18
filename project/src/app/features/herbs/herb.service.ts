import { Injectable } from '@angular/core';
import { Herb } from '../../types/herb';

@Injectable({
  providedIn: 'root'
})
export class HerbService {

  private STORAGE_KEY = 'herbs';

  constructor() { }

  getAll(): Herb[] {
    return this.getHerbs();
  }

  getOne(id: string): Herb | undefined {
    return this.getHerbs().find(h => h.id === id);
  }

  create(herb: Herb) {
    const herbs = this.getHerbs();
    herbs.push(herb);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(herbs));
  }

  update(id: string, updatedHerb: Herb) {
    const herbs = this.getHerbs().map(h =>
      h.id === id ? updatedHerb : h
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(herbs));
  }

  delete(id: string) {
    const herbs = this.getHerbs().filter(h => h.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(herbs));
  }


  private getHerbs(): Herb[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
