import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserLogin } from '../../../shared/models/cart-login.mode';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router)
  private authService = inject(AuthService)
  private fb = inject(FormBuilder)
  public form: FormGroup<UserLogin> = this.fb.group<UserLogin>({
    user: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] })

  })

  public onSubmit(): void {
    if (this.form.invalid) return

    const { user, password } = this.form.getRawValue()

    if (user === 'admin' && password === '1234') {
      this.authService.login()
      this.router.navigate(['/cart'])
    } else {
      alert('Usario o contrasela incorrectos')
    }
  }





}
