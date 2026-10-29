import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    standalone: true, imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template:
        `
            <section class="hero">
                <div class="hero-copy"><p class="eyebrow">ЗНАЙДІТЬ СВОЄ МІСЦЕ</p>
                    <h1>Більше простору.<br><em>Більше життя.</em></h1>
                    <p class="hero-description">Квартира у ритмі міста чи будинок ближче до природи? Ваш наступний крок
                        починається тут.</p><a class="button light" routerLink="/products">Переглянути нерухомість ↗</a>
                    <div class="hero-note"><span class="line"></span>Квартири · Будинки · Комерційні будівлі</div>
                </div>
                <div class="hero-visual"><img src="images/house.jpg" alt="Сучасний будинок із садом" width="1000"
                                              height="1000">
                    <div class="image-caption"><span>ВАШ НОВИЙ ПОЧАТОК</span><strong>Місце, куди хочеться
                        повертатися.</strong></div>
                </div>
            </section>
            <section class="intro"><p class="eyebrow">ПРОСТІР ПІД ВАШІ ПЛАНИ</p>
                <div class="section-heading"><h2>Від мрії до власного ключа.</h2>
                    <p>Обирайте те, що відповідає вашому стилю життя. Усі варіанти — в одному каталозі.</p></div>
                <div class="category-grid">@for (category of categories; track category.name) {
                    <a class="category-tile" routerLink="/products"
                       [queryParams]="{category:category.name}"><span>{{ category.number }} /</span>
                        <h3>{{ category.title }}</h3>
                        <p>{{ category.description }}</p><span class="tile-arrow">↗</span></a>
                }</div>
            </section>
            <section class="closing">
                <div><p class="eyebrow">НОВА ІСТОРІЯ ПОЧИНАЄТЬСЯ ТУТ</p>
                    <h2>Маєте простір для когось?</h2>
                    <p>Додайте своє оголошення та розкажіть про його переваги.</p></div>
                <a class="button" routerLink="/products/new">Додати оголошення ↗</a></section>`
})
export class HomeComponent {
    readonly categories = [{
        name: 'Квартира',
        title: 'Квартири',
        number: '01',
        description: 'Свій куточок у великому місті.'
    }, {name: 'Будинок', title: 'Будинки', number: '02', description: 'Більше місця для важливого.'}, {
        name: 'Будівля',
        title: 'Для бізнесу',
        number: '03',
        description: 'Адреса для ваших амбіцій.'
    }];
}
