import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/client/clientModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/client';

  constructor(private http: HttpClient) { }

  saveClientData(clientData: any) {
    return this.http.post<any>(this.apiUrl, clientData);
  }

  depositToAccount(accountId: number, depositValue: number): Observable<any> {
    return this.http.post(`http://localhost:8080/account/deposit/${accountId}`, depositValue);
  }



  debitToAccount(accountId: number, valorDebito: number): Observable<any> {
    const url = `http://localhost:8080/account/debit/${accountId}`;
    return this.http.post(url, valorDebito);
  }


  createClient(clientData: any): Promise<any> {
    return this.saveClientData(clientData).toPromise();
  }
  getClient(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${clientId}`);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getTransactionHistory(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/transactions/historico/${accountId}`);
  }


  createAccount(account: any) {
    return new Promise((resolve=> {
      resolve(true);
    }))
  }

  getBalance(accountId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/account/balance/${accountId}`);
  }
}
