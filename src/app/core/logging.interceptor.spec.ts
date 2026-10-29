import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { loggingInterceptor } from './logging.interceptor';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
describe('loggingInterceptor',()=>{
 let client:HttpClient;let http:HttpTestingController;
 beforeEach(()=>{TestBed.configureTestingModule({providers:[provideHttpClient(withInterceptors([loggingInterceptor])),provideHttpClientTesting()]});client=TestBed.inject(HttpClient);http=TestBed.inject(HttpTestingController);vi.spyOn(console,'info').mockImplementation(()=>{});vi.spyOn(console,'error').mockImplementation(()=>{})});
 afterEach(()=>{http.verify();vi.restoreAllMocks()});
 it('logs the request method and URL',()=>{client.get('/api/products').subscribe();http.expectOne('/api/products').flush([]);expect(console.info).toHaveBeenCalledWith('[HTTP]','GET','/api/products')});
 it('maps 404 to a useful message',()=>{let message='';client.get('/api/products/missing').subscribe({error:e=>message=e.message});http.expectOne('/api/products/missing').flush({}, {status:404,statusText:'Not found'});expect(message).toContain('не знайдено')});
 it('maps network failures without hiding the error',()=>{let message='';client.get('/api/products').subscribe({error:e=>message=e.message});http.expectOne('/api/products').error(new ProgressEvent('error'));expect(message).toContain('Сервер недоступний')});
});
