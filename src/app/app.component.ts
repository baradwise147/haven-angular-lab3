import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        `<a class="skip" href="#main">До вмісту</a>
        <header>
            <nav class="shell navigation" aria-label="Головна навігація"><a class="brand" routerLink="/"><img
                    src="logo.svg" alt="" width="38" height="38">HAVEN<span>REAL ESTATE</span></a>
                <div class="nav-links"><a routerLink="/" routerLinkActive="active"
                                          [routerLinkActiveOptions]="{exact:true}">Головна</a><a routerLink="/products"
                                                                                                 routerLinkActive="active"
                                                                                                 [routerLinkActiveOptions]="{exact:true}">Нерухомість</a>
                </div>
                <a class="button small" routerLink="/products/new">Додати оголошення <span
                        aria-hidden="true">↗</span></a></nav>
        </header>
        <main id="main" class="shell">
            <router-outlet/>
        </main>
        <footer class="shell"><a class="brand" routerLink="/">HAVEN</a>
            <p>Простір для ваших наступних кроків.</p><span>© 2026 Haven</span></footer>`
})
export class AppComponent {
}
