import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  account= {
    name:'',
    age:'',
    numberAccount:'',
    email: '',
    password: ''
  };
  constructor(
    private accountService: AccountService,
    private router: Router
  ){ }

  ngOnInit(): void {}
  

    async onSubmit() {
      try {
        const result = await this.accountService.createAccount(this.account);

        // exibir uma msg amigavel aqui
        console.log(result);
        this.router.navigate(['/login']);
      } catch (error) {
        console.error(error);
      }
    }
}
