import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../core/product';
@Component({selector:'app-property-card',standalone:true,imports:[RouterLink,DecimalPipe],changeDetection:ChangeDetectionStrategy.OnPush,template:
`<article class="property-card"><a class="photo-link" [routerLink]="['/products', product().id]" [attr.aria-label]="product().name"><img [src]="product().image" [alt]="product().name" loading="lazy" width="800" height="540"><span class="badge">{{ product().category }}</span></a><div class="card-content"><p class="muted location">{{ product().city }} <span>• {{ product().area }} м²</span></p><h3><a [routerLink]="['/products', product().id]">{{ product().name }}</a></h3><div class="card-bottom"><strong>{{ product().price | number:'1.0-0' }} $</strong><a class="round-link" [routerLink]="['/products', product().id]" [attr.aria-label]="'Деталі: ' + product().name">↗</a></div></div></article>`})
export class PropertyCardComponent { readonly product = input.required<Product>(); }
