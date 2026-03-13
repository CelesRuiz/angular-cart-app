import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart-service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CartForm } from '../../shared/models/cart-form.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  imports: [ReactiveFormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  private service = inject(CartService)
  public items = this.service.items
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private authService = inject(AuthService)

  public form: FormGroup<CartForm> = this.fb.group<CartForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    quantity: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] })

  })

  public removeItem(id: string): void {
    this.service.removeItem(id)
  }

  public getTotal(): number {
    return this.service.getTotal()
  }

  public onSubmit(): void {
    if (this.form.invalid) return

    const { name, price, quantity } = this.form.getRawValue()

    this.service.addItem({
      id: crypto.randomUUID(),
      name,
      price,
      quantity
    })
    this.form.reset()
  }

  public logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }











}
