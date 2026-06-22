import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../../models/loginRequest.model';
import { LoginResponse } from '../../models/loginResponse.models';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  loading = false;
  submitted = false;
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      userOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage.set('');
    // Evita enviar el formulario si es inválido

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      next: (res: LoginResponse) => {
        this.loading = false;

        // Guarda el JWT y redirige al módulo de productos
        this.authService.saveToken(res.token);
        this.router.navigate(['/products'], { replaceUrl: true });
        console.log('Login exitoso', res);
      },

      error: (err) => {
        this.loading = false;
        console.log('ERROR LOGIN:', err);
        this.errorMessage.set('Correo o contraseña inválidos');
      },
    });
  }
}
