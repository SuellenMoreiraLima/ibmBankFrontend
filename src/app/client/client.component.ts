import { Component } from '@angular/core';
import { AccountService } from '../account/shared/account.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  selectedOption: string = 'initial';
  account: any = {};
  clients: any[] = [];

  constructor(private accountService: AccountService, private router: Router) {}
  valorDeposito: number = 0;
  valorDebito: number = 0;
  selectedAccountId: number = 0;
  transactionHistory: any[] = [];
  saldoAtual: number = 0;
  message: string = '';
  success: boolean = true;

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
          this.showMessage('Depósito realizado com sucesso!', true);
          this.fetchClientById(this.selectedAccountId);
        }, error => {
          this.showMessage('Erro ao processar depósito.', false);
          console.error('Erro ao processar depósito:', error);
        });
    } else {
      this.showMessage('Valor do depósito ou ID da conta inválido.', false);
    }
  }

  submitDebit(): void {
    if (this.valorDebito > 0 && this.selectedAccountId > 0) {
      this.accountService.debitToAccount(this.selectedAccountId, this.valorDebito).subscribe(
        () => {
          this.showMessage('Débito realizado com sucesso!', true);
          this.fetchClientById(this.selectedAccountId);
        },
        (error) => {
          this.showMessage('Erro ao processar débito.', false);
          console.error('Erro ao processar débito:', error);
        }
      );
    } else {
      this.showMessage('Valor do débito ou ID da conta inválido.', false);
    }
  }

  fetchTransactionHistory(accountId: number): void {
    this.accountService.getTransactionHistory(accountId)
      .subscribe(
        transactions => {
          this.transactionHistory = transactions.map(transaction => ({
            ...transaction,
            formattedDateTime: new Date(transaction.dateTime).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })
          }));
        },
        error => {
          console.error('Erro ao recuperar histórico de transações:', error);
        }
      );
  }

  showMessage(message: string, success: boolean): void {
    this.message = message;
    this.success = success;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  redirectToCreateAccount() {
    this.router.navigate(['/create-account']);
  }
  redirectToHome(){
    this.router.navigate([''])
  }
}
