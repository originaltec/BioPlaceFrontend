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

  /**
   * Creates an instance of SignInComponent.
   * 
   * @param _authService - The authentication service used for user authentication.
   * @param formBuilder - The form builder service used to create the login form.
   * @param _router - The router service used for navigation.
   */
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

  /**
   * Handles the login process for the user.
   * 
   * This method first checks if the login form is valid. If the form is invalid, the method returns early.
   * If the form is valid, it extracts the email and password from the form and calls the authentication service's login method.
   * 
   * On successful login, it saves the received token and navigates the user to the dashboard's products page.
   * If the login fails, it sets an error message indicating incorrect credentials.
   * 
   * @returns {void}
   */
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
