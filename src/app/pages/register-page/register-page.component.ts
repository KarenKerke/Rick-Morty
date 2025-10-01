import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil, zip } from 'rxjs';
import { FormUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroy = new Subject<void>();

  formUtils = FormUtils;
  hidePassword = true;
  hidePassword2 = true;
  isLoading = false;

  myForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)] ],
      email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)] ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', Validators.required],
      adress: [''],
      city: [''],
      country: [''],
      zip: ['']
    },
    {
      validators: [
        FormUtils.isFieldOneEqualFieldTwo('password', 'password2'),
        this.adressValidator()
      ]
    }
  );

  private adressValidator() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const adress = formGroup.get('adress')?.value;
      const city = formGroup.get('city')?.value;
      const country = formGroup.get('country')?.value;
      const zip = formGroup.get('zip')?.value;

      // Si hay algo en adress, entonces city, country y zip son obligatorios
      if (adress && adress.trim() !== '') {
        const errors: any = {};

        if (!city || city.trim() === '') {
          errors.cityRequired = true;
        }
        if (!country || country.trim() === '') {
          errors.countryRequired = true;
        }
        if (!zip || zip.trim() === '') {
          errors.zipRequired = true;
        }

        return Object.keys(errors).length > 0 ? errors : null;
      }
      return null;
    };
  }

  getAddressError(field: 'city' | 'country' | 'zip'): boolean {
    const adress = this.myForm.get('adress')?.value;
    const fieldValue = this.myForm.get(field)?.value;

    return !!((adress && adress.trim() !== '') &&
           (!fieldValue || fieldValue.trim() === '') &&
           (this.myForm.touched || this.myForm.get(field)?.touched));
  }

  ngOnInit() {
    this.subscribeToFormChanges();
  }

  ngOnDestroy() {
    this.cleanup();
  }

 private subscribeToFormChanges(): void {
    this.myForm.valueChanges
    .pipe( takeUntil(this.destroy))
    .subscribe( () => {
      this.myForm.updateValueAndValidity( {emitEvent: false} );
    });
  }

  private cleanup(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.processLoading();
    } else {
      this.handleInvalidForm();
    }
  }

  private isFormValid(): boolean {
    return this.myForm.valid;
  }

  private processLoading(): void {
    this.isLoading = true;

    const formData = this.getFormData();
    const result = this.registerUser(formData);

    if (result.success) {
      this.handleSuccessfulRegistration();
    }
    this.isLoading = false;
  }

  private getFormData() {
    const { name, email, password } = this.myForm.value;
    return { name: name!, email: email!, password: password! };
  }

  private registerUser(userData: any) {
    return this.authService.register(userData);
  }

  private handleSuccessfulRegistration(): void {
    this.navigateToCharacters();
  }

  private navigateToCharacters(): void {
    setTimeout(() => {
      this.router.navigate(['/characters']);
    }, 1000);
  }

  private handleInvalidForm(): void {
    this.markFormAsTouched();
  }

  private markFormAsTouched(): void {
    this.myForm.markAllAsTouched();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  togglePassword2Visibility() {
    this.hidePassword2 = !this.hidePassword2;
  }

}

