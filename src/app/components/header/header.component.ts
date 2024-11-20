import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  name: string = '';
  logout() {
    this.authService.logout();

    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.name = this.authService.currentUser?.displayName || '';
  }
}
