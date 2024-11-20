import { Component } from '@angular/core';
import { AccountService } from '../account/shared/account.service';
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
  valorDeposito: number = 0;
  valorDebito: number = 0;
  selectedAccountId: number = 0;
  transactionHistory: any[] = [];
  saldoAtual: number = 0;
  message: string = '';
  success: boolean = true;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.accountService.getClients().subscribe(
      (clientes) => {
        this.clients = clientes;
      },
      (error) => {
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
    this.accountService.getClient(clientId).subscribe(
      (clienteCompleto) => {
        this.account = clienteCompleto;
        this.saldoAtual = clienteCompleto.saldo;
        this.selectedOption = 'dados';
      },
      (error) => {
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
    if (this.isValidTransaction(this.valorDeposito)) {
      // Enviar diretamente o valor, sem um objeto
      this.accountService.depositToAccount(this.selectedAccountId, this.valorDeposito).subscribe(
        () => {
          this.showMessage('Depósito realizado com sucesso!', true);
          this.fetchClientById(this.selectedAccountId);
        },
        (error) => {
          this.showMessage('Erro ao processar depósito.', false);
          console.error('Erro ao processar depósito:', error);
        }
      );
    }
  }


  submitDebit(): void {
    if (this.isValidTransaction(this.valorDebito)) {
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
    }
  }

  fetchTransactionHistory(accountId: number): void {
    this.accountService.getTransactionHistory(accountId).subscribe(
      (transactions) => {
        this.transactionHistory = transactions.map((transaction) => ({
          ...transaction,
          formattedDateTime: new Date(transaction.dateTime).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }));
      },
      (error) => {
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

  isValidTransaction(amount: number): boolean {
    if (amount <= 0 || this.selectedAccountId <= 0) {
      this.showMessage('Valor ou ID da conta inválido.', false);
      return false;
    }
    return true;
  }

  redirectToCreateAccount(): void {
    this.router.navigate(['/create-account']);
  }

  redirectToHome(): void {
    this.router.navigate(['']);
  }
}
