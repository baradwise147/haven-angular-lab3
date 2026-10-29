import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
        title: 'Haven — ваш новий простір'
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/products-list.component').then(m => m.ProductsListComponent),
        title: 'Каталог — Haven'
    },
    {
        path: 'products/new',
        loadComponent: () => import('./pages/product-form.component').then(m => m.ProductFormComponent),
        title: 'Додати оголошення — Haven'
    },
    {
        path: 'products/:id/edit',
        loadComponent: () => import('./pages/product-form.component').then(m => m.ProductFormComponent),
        title: 'Редагування — Haven'
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./pages/product-details.component').then(m => m.ProductDetailsComponent),
        title: 'Деталі об’єкта — Haven'
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found.component').then(m => m.NotFoundComponent),
        title: 'Сторінку не знайдено — Haven'
    }
];
