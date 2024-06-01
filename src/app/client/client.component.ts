import { Component } from '@angular/core';
import { AccountService } from '../account/shared/account.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  selectedOption: string = 'dados';
  account: any = {};
  clients: any[] = [];

  constructor(private accountService: AccountService) {}
  valorDeposito: number = 0;
  valorDebito: number = 0;
  selectedAccountId: number = 0;
  transactionHistory: any[] = [];
  saldoAtual: number = 0;

  ngOnInit(): void {
    this.accountService.getClients()
      .subscribe(
        clientes => {
          this.clients = clientes;
        },
        error => {
          console.error('Erro ao recuperar lista de clientes:', error);
        }
      );
  }

  changeContent(option: string): void {
    this.selectedOption = option;
    if (option === 'extrato') {
      this.fetchTransactionHistory(this.selectedAccountId);
      this.fetchAccountBalance(this.selectedAccountId);
    }
  }

  fetchClientById(clientId: number): void {
    this.accountService.getClient(clientId)
      .subscribe(
        clienteCompleto => {
          this.account = clienteCompleto;
          this.saldoAtual = clienteCompleto.saldo;
          this.selectedOption = 'dados';
        },
        error => {
          console.error('Erro ao recuperar dados do cliente:', error);
        }
      );
  }
  fetchAccountBalance(accountId: number): void {
    this.accountService.getBalance(accountId).subscribe(
      (balance) => {
        this.saldoAtual = balance;
      },
      (error) => {
        console.error('Erro ao recuperar saldo da conta:', error);
      }
    );
  }

  submitDeposit(): void {
    if (this.valorDeposito > 0 && this.selectedAccountId > 0) {
      this.accountService.depositToAccount(this.selectedAccountId, this.valorDeposito)
        .subscribe(() => {
          console.log('Depósito realizado com sucesso!');
          this.fetchClientById(this.selectedAccountId);
        }, error => {
          console.error('Erro ao processar depósito:', error);
        });
    } else {
      console.error('Valor do depósito ou ID da conta inválido.');
    }
  }

 /*  submitDebit(): void {
    if (this.valorDebito > 0 && this.selectedAccountId > 0) {
      this.accountService.debitToAccount(this.selectedAccountId, this.valorDebito)
        .subscribe(() => {
          console.log('Débito realizado com sucesso!');
          this.fetchClientById(this.selectedAccountId);
        }, error => {
          console.error('Erro ao processar débito:', error);
        });
    } else {
      console.error('Valor do débito ou ID da conta inválido.');
    }
  } */
  submitDebit(): void {
    if (this.valorDebito > 0 && this.selectedAccountId > 0) {
      console.log('Valor de débito enviado:', this.valorDebito);  // Adicione este log
      this.accountService.debitToAccount(this.selectedAccountId, this.valorDebito).subscribe(
        () => {
          console.log('Débito realizado com sucesso!');
          this.fetchClientById(this.selectedAccountId);
        },
        (error) => {
          console.error('Erro ao processar débito:', error);
        }
      );
    } else {
      console.error('Valor do débito ou ID da conta inválido.');
    }
  }

  fetchTransactionHistory(accountId: number): void {
    this.accountService.getTransactionHistory(accountId)
      .subscribe(
        transactions => {
          this.transactionHistory = transactions;
        },
        error => {
          console.error('Erro ao recuperar histórico de transações:', error);
        }
      );
  }
}
