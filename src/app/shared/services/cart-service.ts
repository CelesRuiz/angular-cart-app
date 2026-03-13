import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'cart-item'
  private _items = signal<CartItem[]>(this.loadFromStorage())
  public items = this._items.asReadonly()

  private loadFromStorage(): CartItem[] {
    const data = localStorage.getItem('cart-item')
    if (!data || data === 'undefined') return []
    return data ? JSON.parse(data) : []
  }
  saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items()))
  }


  public addItem(item: CartItem): void {
    this._items.update(list => [...list, item])
    this.saveToStorage()
  }

  public removeItem(id: string): void {
    this._items.update(list => list.filter(t => t.id !== id))
    this.saveToStorage()
  }

  public getTotal(): number {
    return this._items().reduce((total, item) => total + item.price * item.quantity, 0)
  }

}
