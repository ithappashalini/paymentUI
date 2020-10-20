import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http:HttpClient) { }

  getPaymentList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'payment-list');
  }

  createBill(payment: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'save-payment', payment);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-payment/${id}`, { responseType: 'text' });
  }

  getPayment(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}update-status/${id}`, null);
  }

  getPaymentByActive(): Observable<any> {
    return this.http.get(`${this.baseUrl}active-status`);
  }

  updatePayment(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}update-status/${id}`, value);
  }

  getRemovePaymentInCart(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}update-payment-status/${id}`, null);
  }

}
