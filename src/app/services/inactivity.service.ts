import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timeoutId: any;
  private inactivetyTime = 5 * 60 * 1000; // tempo de inatividade 5 minutos

  constructor(
    private auth: Auth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.initListener();
  }

  private initListener() {
    this.resetTimer();
    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keydown', () => this.resetTimer());
  }

  private resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.logout(), this.inactivetyTime);
  }

  private logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
      alert('Sessão expirada!');
    });
  }
}
