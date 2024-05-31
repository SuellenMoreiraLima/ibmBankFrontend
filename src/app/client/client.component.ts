import { Component } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {

  selectedOption: string = '';

  changeContent(option: string): void {
    this.selectedOption = option;
  }
}
