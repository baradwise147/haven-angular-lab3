import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';
import {ProductsService} from './products.service';
import {Product, ProductInput} from './product';
import {beforeEach, afterEach, describe, it, expect} from 'vitest';

const draft: ProductInput = {
    name: 'Квартира біля парку',
    category: 'Квартира',
    city: 'Київ',
    price: 90000,
    area: 60,
    rooms: 2,
    description: 'Світла квартира з великим балконом.',
    image: 'images/apartment.jpg'
};
const product: Product = {...draft, id: '1'};
describe('ProductsService HTTP CRUD', () => {
    let service: ProductsService;
    let http: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({providers: [provideHttpClient(), provideHttpClientTesting()]});
        service = TestBed.inject(ProductsService);
        http = TestBed.inject(HttpTestingController)
    });
    afterEach(() => http.verify());
    it('loads the catalog using GET', () => {
        service.list().subscribe(data => expect(data).toEqual([product]));
        const req = http.expectOne('/api/products');
        expect(req.request.method).toBe('GET');
        req.flush([product])
    });
    it('loads a single product by id', () => {
        service.get('1').subscribe(data => expect(data.id).toBe('1'));
        const req = http.expectOne('/api/products/1');
        expect(req.request.method).toBe('GET');
        req.flush(product)
    });
    it('creates a product with POST and returns the server id', () => {
        service.create(draft).subscribe(data => expect(data.id).toBe('new'));
        const req = http.expectOne('/api/products');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(draft);
        req.flush({...draft, id: 'new'})
    });
    it('updates a product with PUT', () => {
        service.update('1', {...draft, price: 95000}).subscribe(data => expect(data.price).toBe(95000));
        const req = http.expectOne('/api/products/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body.price).toBe(95000);
        req.flush({...product, price: 95000})
    });
    it('deletes only the requested product', () => {
        service.delete('1').subscribe();
        const req = http.expectOne('/api/products/1');
        expect(req.request.method).toBe('DELETE');
        req.flush({})
    });
    it('propagates server failures', () => {
        let status = 0;
        service.get('missing').subscribe({error: e => status = e.status});
        http.expectOne('/api/products/missing').flush({}, {status: 404, statusText: 'Not found'});
        expect(status).toBe(404)
    });
});
