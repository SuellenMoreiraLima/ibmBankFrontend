import { HomeComponent } from './../../home/home.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this.fb.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required, Validators.nullValidator],
      age: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      numberAccount: ['', Validators.required, Validators.min(5), Validators.max(6)],
      email: ['', [Validators.required, Validators.email]],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  get formControls() {
    return this.accountForm.controls;
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onSubmit() {
    if (this.accountForm.invalid) {
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

  redirectToClients(){
    this.router.navigate(['/client']);
  }
  redirectToHome(){
    this.router.navigate([''])
  }
}
