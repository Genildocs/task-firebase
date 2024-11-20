import { Component } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css',
})
export class NewAccountComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private createUserService: CreateUserService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required], // Campo para selecionar o papel
    });
  }

  async register() {
    if (this.registerForm.valid) {
      const { email, password, role } = this.registerForm.value;
      const result = await this.createUserService.registerUser(
        email,
        password,
        role
      );
      if (typeof result === 'string') {
        this.errorMessage = result;
      } else {
        this.errorMessage = '';
      }
    } else {
      this.toastr.error('Por favor, preencha todos os campos corretamente.');
    }
  }
}
