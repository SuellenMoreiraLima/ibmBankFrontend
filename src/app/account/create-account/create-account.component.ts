import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required, Validators.nullValidator],
      age: ['', [Validators.required, Validators.min(1)]],
      numberAccount: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  get formControls() {
    return this.accountForm.controls;
  }

  onSubmit() {
    if (this.accountForm.invalid) {
      // Trigger validation messages
      Object.keys(this.formControls).forEach(field => {
        const control = this.accountForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.accountService.saveClientData(this.accountForm.value)
      .subscribe(
        (response) => {
          console.log('Dados do cliente salvos com sucesso:', response);
          this.router.navigate(['/client']);
        },
        (error) => {
          console.error('Erro ao salvar dados do cliente:', error);
        }
      );
  }
}
