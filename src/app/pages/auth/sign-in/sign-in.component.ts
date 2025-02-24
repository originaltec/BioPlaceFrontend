import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceToken } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private _authService : AuthServiceToken,
    private formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this._authService.login(email, password).subscribe(
      (response : any) => {
        const token = response.token;
        this._authService.saveToken(token);

        this._router.navigate(['/dashboard/productos']);
      },
      (error : any) => {
        this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
      }
    );
  }
}
