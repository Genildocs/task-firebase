import { Component } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css',
})
export class NewAccountComponent {
  email: string | undefined;
  password: string | undefined;
  errorMessage: string = '';
  constructor(private createUserService: CreateUserService) {}

  async register() {
    const user = await this.createUserService.createUser(
      this.email!,
      this.password!
    );
  }
}
