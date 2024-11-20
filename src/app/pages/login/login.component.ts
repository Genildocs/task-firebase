import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserData } from '../../date/date';
import { AuthService } from '../../services/auth.service';
import { CreateUserService } from '../../services/create-user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private createUserService: CreateUserService,
    private authService: AuthService
  ) {}

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        if (result.user) {
          const userData: UserData = {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
          };

          localStorage.setItem('user', JSON.stringify(userData));
          this.authService.setCurrentUser(userData);
          this.router.navigate(['home']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loginUserEmailAndPassword() {
    this.createUserService.login(this.email, this.password);
    this.router.navigate(['home']);
  }
}
