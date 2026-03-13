import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isloggedIn = signal<boolean>(localStorage.getItem('is_logged_in') === 'true');

  public login(): void {
    this._isloggedIn.set(true)
    localStorage.setItem('is_logged_in', 'true')
  }
  public logout(): void {
    this._isloggedIn.set(false)
    localStorage.removeItem('is_logged_in')
  }

  public isLoggedIn(): boolean {
    return this._isloggedIn()
  }

}
