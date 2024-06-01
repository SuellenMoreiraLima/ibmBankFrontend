/* import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  saveClientData(clientData: any) {
    return this.http.post<any>('http://localhost:8080/client', clientData);
  }

  // Modificação: Retornar os dados do cliente criado
  createClient(clientData: any): Promise<any> {
    return this.saveClientData(clientData).toPromise();
  }

   login(user: any) {
     return new Promise((resolve) => {
       window.localStorage.setItem('token', 'meu-token');
      resolve(true);
     })
   }
 */


/* } */
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
    const depositRequest = { valorDeposito: depositValue };
    return this.http.post(`http://localhost:8080/account/deposit/${accountId}`, depositRequest);
  }
  /* debitToAccount(accountId: number, debitValue: number): Observable<any> {
    const debitRequest = { valorDeposito: debitValue };
    return this.http.post(`http://localhost:8080/account/debit/${accountId}`, debitRequest);
  } */
  debitToAccount(accountId: number, valorDebito: number): Observable<any> {
    const url = `http://localhost:8080/account/debit/${accountId}`;
    console.log('URL:', url);  // Adicione este log
    console.log('Payload:', { valorDebito });  // Adicione este log
    return this.http.post<any>(url, { valorDebito });
  }

  // Modificação: Retornar o ID do cliente juntamente com os outros dados
  createClient(clientData: any): Promise<any> {
    return this.saveClientData(clientData).toPromise();
  }
/*
  getClient(clientId: number): Promise<any> {
return this.http.get<any>(`'http://localhost:8080/client/${clientId}`).toPromise();
  } */
  getClient(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${clientId}`);
  }
  getTransactionHistory(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/transactions/historico/${accountId}`);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  loginOn(user: any) {
    return new Promise((resolve) => {
      window.localStorage.setItem('token', 'meu-token');
     resolve(true);
    })
  }

  createAccount(account: any) {
    return new Promise((resolve=> {
      resolve(true);
    }))
  }

  authenticate(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Enviar solicitação HTTP para o endpoint de autenticação
      this.http.post<any>('/login', { email, password })
        .subscribe(
          userData => {
            resolve(userData);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getBalance(accountId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/account/balance/${accountId}`);
  }
}
