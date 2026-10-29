import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product, ProductInput} from './product';

@Injectable({providedIn: 'root'})
export class ProductsService {
    private readonly http = inject(HttpClient);
    private readonly url = '/api/products';

    list() {
        return this.http.get<Product[]>(this.url);
    }

    get(id: string) {
        return this.http.get<Product>(this.url + '/' + encodeURIComponent(id));
    }

    create(product: ProductInput) {
        return this.http.post<Product>(this.url, product);
    }

    update(id: string, product: ProductInput) {
        return this.http.put<Product>(this.url + '/' + encodeURIComponent(id), product);
    }

    delete(id: string) {
        return this.http.delete<void>(this.url + '/' + encodeURIComponent(id));
    }
}
