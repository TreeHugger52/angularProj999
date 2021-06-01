import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { User } from "../_models/user.model";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError,  tap } from "rxjs/operators";

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered ? : string;
}

@Injectable({ providedIn: 'root' })

export class ServerQueryService {
  user = new BehaviorSubject < User > (null);

  constructor(private http: HttpClient) {}

  // normal login request to begin using the service.

  normalLoginAttempt(req: { uid: string;pin: string }) {
    const apiLogin: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAhrSOFPtBA-YMlFdBqVo13i5KcQ7JRZg";

    return this.http.post < AuthResponse > (apiLogin, {
      email: req.uid,
      password: req.pin
    }).pipe(catchError(this.errHandling),
      tap(res => {
        this.establishUserObject(res.email, res.localId, res.idToken, +res.expiresIn);
      }));
  }

  // same login process-- except we check if the user logging in has accessible admin privileges.

  adminLoginRequest(req: { uid: number;pin: number;userAdminPrivileges: boolean }) { }

  createUser(req: { uid: number;pin: number  }) {
    const apiCreate: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAhrSOFPtBA-YMlFdBqVo13i5KcQ7JRZg"

    return this.http.post < AuthResponse > (apiCreate, {
      email: req.uid,
      password: req.pin,
      returnSecureToken: true
    }).pipe(
      catchError(this.errHandling),
      tap(res => {
        this.establishUserObject(res.email, res.localId, res.idToken, +res.expiresIn);
      })
    );
  }


  modifyUser() { }

  destroyUser() { }

  private establishUserObject(email: string, userId: string, _jwt: string, _jwtExpiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + _jwtExpiresIn * 1000);
    const user = new User(email, userId, _jwt, expirationDate);

    this.user.next(user);
  }

  private errHandling(err: HttpErrorResponse) {
    let e = 'Unknown error';

    if (!err.error || !err.error.error) { return throwError(e); }

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        e = 'email exists';
        break;
      case 'EMAIL_NOT_FOUND':
        e = 'not found';
        break;
      case 'INVALID_PASSWORD':
        e = 'invalid pin';
        break;
    }

    return throwError(e);
  }


}
