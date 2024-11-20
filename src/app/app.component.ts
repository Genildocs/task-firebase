import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { InactivityService } from './services/inactivity.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private inactivityService: InactivityService
  ) {
    // Verifica se o usuário está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}
