import { FormControl } from "@angular/forms"
export type CartForm = {
    name: FormControl<string>
    price: FormControl<number>
    quantity: FormControl<number>

}