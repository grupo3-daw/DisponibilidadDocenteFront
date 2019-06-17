import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {
  constructor(private readonly router: Router) {}
  canActivate(): Promise<boolean> | boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === undefined || user === null || user.EMAIL === null) {
      return this.haciaLogin();
    }

    return true;
  }

  haciaLogin(): boolean {
    this.router.navigate(['/auth']);

    return false;
  }
}
