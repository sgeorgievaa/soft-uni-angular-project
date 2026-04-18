import { Injectable } from '@angular/core';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USERS_KEY = 'users';
  private CURRENT_USER_KEY = 'currentUser';

  constructor() { }

  register(user: User): boolean {
    const users = this.getUsers();
  
    const found = users.find(
      u => u.email === user.email && u.password === user.password
    );

    if (found) return false;

    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    // to login automatically after register
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));

    return true;
  }

  login(user: User): boolean {
    const users = this.getUsers();

    const found = users.find(
      u => u.email === user.email && u.password === user.password
    );

    if (!found) return false;

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(found));
    return true;
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }


  private getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }
}
