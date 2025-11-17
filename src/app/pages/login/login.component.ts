import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } = this.form.value;

    this.userService.login(email, password).subscribe({
      next: (user) => {
        this.loading = false;

        if (!user) {
          this.error = 'E-mail ou senha inválidos.';
          return;
        }

        // Guardar usuário atual (simples, só pra Perfil e navegação)
        localStorage.setItem('currentUser', JSON.stringify(user));

        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Erro ao tentar fazer login.';
        this.loading = false;
      }
    });
  }
}
