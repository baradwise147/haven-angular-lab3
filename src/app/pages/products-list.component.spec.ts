import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {of, throwError} from 'rxjs';
import {beforeEach, describe, it, expect, vi} from 'vitest';
import {ProductsListComponent} from './products-list.component';
import {ProductsService} from '../core/products.service';
import {Product} from '../core/product';

const products: Product[] = Array.from({length: 9}, (_, i) => ({
    id: String(i + 1),
    name: 'Об’єкт ' + i,
    category: i < 7 ? 'Квартира' : 'Будинок',
    city: i % 2 ? 'Львів' : 'Київ',
    price: 100000,
    area: 60,
    rooms: 2,
    description: 'Опис просторого об’єкта',
    image: 'images/house.jpg'
}));
describe('ProductsListComponent', () => {
    let service: { list: ReturnType<typeof vi.fn> };
    beforeEach(() => {
        service = {list: vi.fn(() => of(products))};
        TestBed.configureTestingModule({
            imports: [ProductsListComponent],
            providers: [provideRouter([]), {provide: ProductsService, useValue: service}]
        })
    });
    it('renders six cards on the first page and three on the second', () => {
        const fixture = TestBed.createComponent(ProductsListComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('app-property-card').length).toBe(6);
        fixture.componentInstance.page.set(2);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('app-property-card').length).toBe(3)
    });
    it('combines category, city and search filters and resets pagination', () => {
        const component = TestBed.createComponent(ProductsListComponent).componentInstance;
        component.page.set(2);
        component.setCategory('Квартира');
        expect(component.page()).toBe(1);
        component.setCity('Київ');
        component.setSearch('Об’єкт 2');
        expect(component.filtered().map(p => p.id)).toEqual(['3']);
        component.reset();
        expect(component.filtered().length).toBe(9)
    });
    it('shows an empty result when the search does not match', () => {
        const fixture = TestBed.createComponent(ProductsListComponent);
        fixture.componentInstance.setSearch('немає такого об’єкта');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Поки що нічого');
        expect(fixture.componentInstance.pageCount()).toBe(1)
    });
    it('shows API failures and allows a successful retry', () => {
        service.list.mockReturnValueOnce(throwError(() => new Error('API offline')));
        const fixture = TestBed.createComponent(ProductsListComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('API offline');
        fixture.componentInstance.load();
        fixture.detectChanges();
        expect(fixture.componentInstance.products().length).toBe(9);
        expect(fixture.componentInstance.error()).toBe('')
    });
});
