import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (request, next) => {
    console.info('[HTTP]', request.method, request.url);
    return next(request).pipe(catchError((error: HttpErrorResponse) => {
        const message = error.status === 0 || error.status === 504
            ? 'Сервер недоступний. Перевірте, чи запущено API, та спробуйте ще раз.'
            : error.status === 404 ? 'Оголошення не знайдено. Можливо, його вже видалили.'
                : 'Не вдалося виконати запит. Спробуйте ще раз.';
        console.error('[HTTP]', request.method, request.url, error.status);
        return throwError(() => new Error(message));
    }));
};
