import { environment } from "../../environments/environment";

import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { timeout, catchError, tap } from "rxjs/operators";

import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  private users: User[] = [];

  private authenticated = false;
  private authToken = { access: null, refresh: null };

  constructor(private http: HttpClient) {}

  // /Users - returns json: all registered users
  getUsers(): Observable<User[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.authToken
      })
    };
    return this.http.get<User[]>(environment.apiUrl + "users/").pipe(
      timeout(5000),
      tap(users => {
        if (users) {
          this.users = [...users];
        }
      }),
      catchError(err => {
        console.log("Error getting userlist: ", err);
        return throwError(err);
      })
    );
  }

  getUserByName(username: string): User {
    for (const user of this.users) {
      if (user.username === username) {
        return user;
      }
    }
  }

  // POST/auth/users/ - endpoint that allows registration of new users
  // required params - username, password
  registerNewUser(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string
  ): Observable<User> {
    const newUser = {
      first_name,
      last_name,
      email,
      username,
      password
    };
    return this.http
      .post<any>(environment.authUrl + "users/", newUser, this.httpOptions)
      .pipe(
        timeout(5000),
        tap((response: any) => {
          console.log("response from auth/users/: " + response);
        }),
        catchError(err => {
          return of({ error: err });
        })
      );
  }

  // POST/auth/jwt/create - logs in user and returns access and refresh jwt tokens
  // params - username, password
  login(username: string, password: string): Observable<any> {
    const login = {
      username,
      password
    };
    return this.http
      .post<any>(environment.authUrl + "jwt/create/", login, this.httpOptions)
      .pipe(
        timeout(5000),
        tap((response: any) => {
          this.authToken.access = response.access;
          this.authToken.refresh = response.refresh;
          this.authenticated = true;
        }),
        catchError(err => {
          return of({ error: "falied to login user!" });
        })
      );
  }

  logout(): void {
    this.authenticated = false;
    this.authToken = { access: null, refresh: null };
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

  getAuthToken(): string {
    return this.authToken.access;
  }
}
