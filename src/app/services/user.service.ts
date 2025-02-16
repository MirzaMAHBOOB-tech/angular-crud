import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'users';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  // Helper method to check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  getUsers(): any[] {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }
    return [];
  }

  addUser(user: any): void {
    if (this.isLocalStorageAvailable()) {
      const users = this.getUsers();
      users.push(user);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }

  updateUser(user: any, index: number): void {
    if (this.isLocalStorageAvailable()) {
      const users = this.getUsers();
      users[index] = user;
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }

  deleteUser(index: number): void {
    if (this.isLocalStorageAvailable()) {
      const users = this.getUsers();
      users.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }
}
