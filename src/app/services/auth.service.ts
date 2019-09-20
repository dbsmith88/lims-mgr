import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  testUser1: User = {
    username: 'kwolfe',
    dateAdded: '1/1/2019',
    dateDisabled: null
  };
  testUser2: User = {
    username: 'brittany stuart',
    dateAdded: '2/2/2018',
    dateDisabled: null
  };
  testUser3: User = {
    username: 'j dog',
    dateAdded: '3/1/1970',
    dateDisabled: null
  };
  testUser4: User = {
    username: 'dr parmar',
    dateAdded: '12/12/2099',
    dateDisabled: null
  };
  users: User[] = [this.testUser1, this.testUser2, this.testUser3, this.testUser4];
  private authenticated = false;

  constructor() {}

  // api call
  getUsers(): User[] {
    return this.users;
  }

  getUserByName(username: string): User {
    for (const user of this.getUsers()) {
      if (user.username === username) {
        return user;
      }
    }
  }

  // api call
  addUser(): void {
    // add a new user to the userlist
  }

  // api call
  disableUser(username: string): void {
    // disable an existing user and update userlist
    const user = this.getUserByName(username);
    user.dateDisabled = Date.now().toString();
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  // api call
  authenticateUser(usrName: string, password: string) {
    // for test purposes
    this.authenticated = true; // if authenticated by authentication server
  }

  // api call
  logout(): void {
    this.authenticated = false;
  }
}
