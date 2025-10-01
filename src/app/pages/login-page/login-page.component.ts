import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { FormUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroy = new Subject<void>();

  formUtils = FormUtils;
  hidePassword = true;
  isLoading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  ngOnDestroy() {
    this.cleanup();
  }

  private cleanup(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.processLogin();
    } else {
      this.handleInvalidForm();
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  private isFormValid(): boolean {
    return this.loginForm.valid;
  }

  private processLogin(): void {
    this.isLoading = true;

    setTimeout(() => {
      const credentials = this.getCredentials();
      const result = this.attemptLogin(credentials);

      if (result.success) {
        this.handleSuccessfulLogin();
      }else{
        this.handleFailedLogin(result.message);
      }
      this.isLoading = false;
    }, 1000);
  }

  private getCredentials() {
    const { email, password } = this.loginForm.value;
    return { email: email!, password: password! };
  }

  private attemptLogin(credentials: { email: string; password: string }) {
    return this.authService.login(credentials.email, credentials.password);
  }

  private handleSuccessfulLogin(): void {
    this.navigateToCharacters();
  }

  private handleFailedLogin(message: string): void {
    alert(message);
  }

  private handleInvalidForm(): void {
    this.loginForm.markAllAsTouched();
  }

  private navigateToCharacters(): void {
    this.router.navigate(['/characters']);
  }

}

