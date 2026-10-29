import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductsService} from '../core/products.service';
import {Product} from '../core/product';

@Component({
    standalone: true,
    imports: [RouterLink, DecimalPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent {
    private readonly service = inject(ProductsService);
    private readonly router = inject(Router);
    readonly product = signal<Product | null>(null);
    readonly loading = signal(true);
    readonly error = signal('');
    readonly deleteError = signal('');
    readonly deleting = signal(false);
    readonly confirming = signal(false);
    private id = '';

    constructor() {
        inject(ActivatedRoute).paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
            this.id = params.get('id') ?? '';
            this.confirming.set(false);
            this.load()
        });
    }

    load() {
        this.loading.set(true);
        this.error.set('');
        this.product.set(null);
        this.service.get(this.id).subscribe({
            next: p => {
                this.product.set(p);
                this.loading.set(false)
            }, error: (e: Error) => {
                this.error.set(e.message);
                this.loading.set(false)
            }
        });
    }

    remove() {
        if (this.deleting()) return;
        this.deleting.set(true);
        this.deleteError.set('');
        this.service.delete(this.id).subscribe({
            next: () => {
                void this.router.navigate(['/products'])
            }, error: (e: Error) => {
                this.deleteError.set(e.message);
                this.deleting.set(false)
            }
        });
    }
}
