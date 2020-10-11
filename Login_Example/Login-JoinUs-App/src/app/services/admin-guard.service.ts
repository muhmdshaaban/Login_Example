import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(router, state: RouterStateSnapshot): boolean {

    if (this.authService.currentUser().isAdmin) {
      return true;
    } else {
      this.router.navigate(['/noaccess']);
    }
  }


}
