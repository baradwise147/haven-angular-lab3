import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductsService} from '../core/products.service';
import {Product, categories} from '../core/product';
import {PropertyCardComponent} from '../shared/property-card.component';

@Component({
    standalone: true,
    imports: [RouterLink, PropertyCardComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './products-list.component.html'
})
export class ProductsListComponent {
    private readonly service = inject(ProductsService);
    readonly products = signal<Product[]>([]);
    readonly loading = signal(false);
    readonly error = signal('');
    readonly category = signal('');
    readonly city = signal('');
    readonly search = signal('');
    readonly page = signal(1);
    readonly categories = categories;
    readonly pageSize = 6;
    readonly cities = computed(() => [...new Set(this.products().map(p => p.city))].sort());
    readonly filtered = computed(() => this.products().filter(p => (!this.category() || p.category === this.category()) && (!this.city() || p.city === this.city()) && p.name.toLocaleLowerCase('uk').includes(this.search().trim().toLocaleLowerCase('uk'))));
    readonly pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
    readonly visible = computed(() => this.filtered().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize));

    constructor() {
        inject(ActivatedRoute).queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
            const category = params.get('category') ?? '';
            this.category.set(categories.some(c => c === category) ? category : '');
            this.page.set(1)
        });
        this.load();
    }

    load() {
        this.loading.set(true);
        this.error.set('');
        this.service.list().subscribe({
            next: data => {
                this.products.set(data);
                this.page.set(1);
                this.loading.set(false)
            }, error: (error: Error) => {
                this.error.set(error.message);
                this.loading.set(false)
            }
        });
    }

    setCategory(value: string) {
        this.category.set(value);
        this.page.set(1)
    }

    setCity(value: string) {
        this.city.set(value);
        this.page.set(1)
    }

    setSearch(value: string) {
        this.search.set(value);
        this.page.set(1)
    }

    reset() {
        this.category.set('');
        this.city.set('');
        this.search.set('');
        this.page.set(1)
    }
}
