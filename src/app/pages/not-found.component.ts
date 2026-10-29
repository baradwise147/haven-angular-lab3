import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: '<section class="state"><p class="eyebrow">404</p><h1>Цю адресу ще не заселили.</h1><p>Такої сторінки немає. Поверніться до каталогу.</p><a class="button" routerLink="/products">До нерухомості ↗</a></section>'
})
export class NotFoundComponent {
}
