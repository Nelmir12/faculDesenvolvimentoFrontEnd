import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.error = 'Preencha todos os campos corretamente.';
      return;
    }

    // Simulação de login básico
    const { email, senha } = this.form.value;
    if (email === 'admin@teste.com' && senha === '1234') {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciais inválidas.';
    }
  }
}
