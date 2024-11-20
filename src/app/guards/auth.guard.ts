// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CreateUserService } from '../services/create-user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private createUserService: CreateUserService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() || this.createUserService.login()) {
      return true;
    } else {
      // Redireciona para a página de login se não estiver autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
