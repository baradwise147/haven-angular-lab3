import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductsService} from '../core/products.service';
import {categories} from '../core/product';

export function nonBlank(control: AbstractControl) {
    return typeof control.value === 'string' && !control.value.trim() ? {blank: true} : null;
}

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
    private readonly fb = inject(FormBuilder);
    private readonly service = inject(ProductsService);
    private readonly router = inject(Router);
    readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id');
    readonly categories = categories;
    readonly loading = signal(false);
    readonly saving = signal(false);
    readonly error = signal('');
    readonly loadFailed = signal(false);
    readonly images = [{value: 'images/apartment.jpg', label: 'Світла квартира'}, {
        value: 'images/house.jpg',
        label: 'Будинок із садом'
    }, {value: 'images/office.jpg', label: 'Офісна будівля'}, {
        value: 'images/interior.jpg',
        label: 'Сучасний інтер’єр'
    }, {value: 'images/villa.jpg', label: 'Приватний будинок'}, {
        value: 'images/workspace.jpg',
        label: 'Робочий простір'
    }];
    readonly form = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), nonBlank]],
        category: ['Квартира', [Validators.required]],
        city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60), nonBlank]],
        price: [1, [Validators.required, Validators.min(1), Validators.max(1000000000)]],
        area: [1, [Validators.required, Validators.min(1), Validators.max(100000)]],
        rooms: [1, [Validators.required, Validators.min(1), Validators.max(1000), Validators.pattern(/^\d+$/)]],
        description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(3000), nonBlank]],
        image: ['images/apartment.jpg', Validators.required]
    });

    constructor() {
        if (this.id) this.load();
    }

    invalid(name: keyof typeof this.form.controls) {
        const c = this.form.controls[name];
        return c.invalid && c.touched;
    }

    load() {
        if (!this.id) return;
        this.loading.set(true);
        this.loadFailed.set(false);
        this.error.set('');
        this.service.get(this.id).subscribe({
            next: p => {
                this.form.patchValue(p);
                this.loading.set(false)
            }, error: (e: Error) => {
                this.error.set(e.message);
                this.loadFailed.set(true);
                this.loading.set(false)
            }
        });
    }

    save() {
        if (this.saving() || this.loadFailed()) return;
        this.form.markAllAsTouched();
        if (this.form.invalid) return;
        const value = this.form.getRawValue();
        const product = {
            ...value,
            name: value.name.trim(),
            city: value.city.trim(),
            description: value.description.trim()
        };
        this.saving.set(true);
        this.error.set('');
        const request = this.id ? this.service.update(this.id, product) : this.service.create(product);
        request.subscribe({
            next: p => {
                void this.router.navigate(['/products', p.id])
            }, error: (e: Error) => {
                this.error.set(e.message);
                this.saving.set(false)
            }
        });
    }
}
